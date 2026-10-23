/* ============================================================================
   DE NADA TEQUILA — SIGNUP
   ----------------------------------------------------------------------------
   Reads js/list-config.js. Sends a signup to Klaviyo (if configured) and to
   Netlify Forms as a backup record. If Klaviyo is not configured or the
   request fails, Netlify Forms is the destination and must succeed.

   Each profile is tagged with WHERE it signed up, so the list can be
   segmented later:
     signup_source  "homepage" | "teaser" | "cocktails" ... (+ ":utm_campaign"
                     when present, e.g. "teaser:blanco-trailer" from a QR code)
     signup_page    the path of the page
   ============================================================================ */
(function () {
  "use strict";
  var CFG = window.DENADA_LIST || {};

  function netlify(form) {
    return fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function (r) { if (!r.ok) throw new Error("netlify " + r.status); });
  }

  function klaviyo(email, source) {
    if (!CFG.klaviyoCompanyId || !CFG.klaviyoListId) return Promise.reject(new Error("klaviyo not configured"));
    var body = {
      data: {
        type: "subscription",
        attributes: {
          custom_source: "Website: " + source,
          profile: { data: { type: "profile", attributes: {
            email: email,
            properties: { signup_source: source, signup_page: location.pathname }
          } } }
        },
        relationships: { list: { data: { type: "list", id: CFG.klaviyoListId } } }
      }
    };
    return fetch("https://a.klaviyo.com/client/subscriptions/?company_id=" + encodeURIComponent(CFG.klaviyoCompanyId), {
      method: "POST",
      headers: { "Content-Type": "application/json", "revision": "2024-10-15" },
      body: JSON.stringify(body)
    }).then(function (r) { if (!r.ok) throw new Error("klaviyo " + r.status); });
  }

  function sourceFor(form) {
    var s = (form.querySelector("[name=source]") || {}).value || "website";
    var utm = new URLSearchParams(location.search).get("utm_campaign");
    return utm ? s + ":" + utm : s;
  }

  /* ---- Bot filter -------------------------------------------------------
     Signup bots were hitting the forms (Oct 2026): dotted-Gmail addresses
     such as f.rankli.n.91.6@gmail.com, random-suffix Hotmail addresses, and
     submits a second or two after the page loaded. Three cheap checks, no
     third-party service. A bot still sees the normal thank-you, it just
     never reaches the list.
       1. Honeypot: the hidden "bot-field" input is filled in.
       2. Speed: the form was submitted under MIN_MS after the script loaded.
       3. Gmail dot stuffing: three or more dots in the local part. Gmail
          ignores dots, so real people almost never type an address that way.
     ---------------------------------------------------------------------- */
  var LOADED_AT = Date.now(), MIN_MS = 3000;

  function looksLikeBot(form, email) {
    var trap = form.querySelector("[name=bot-field]");
    if (trap && trap.value) return "honeypot";
    if (Date.now() - LOADED_AT < MIN_MS) return "too-fast";
    var m = /^([^@]+)@gmail\.com$/i.exec(email.trim());
    if (m && (m[1].match(/\./g) || []).length >= 3) return "gmail-dots";
    return "";
  }

  /* After a signup, tell Klaviyo's onsite script who this visitor is so the
     product pages they look at from now on count as theirs (js/klaviyo-track.js). */
  function remember(email, source) {
    try { localStorage.setItem("dn_email", email); } catch (e) {}
    try { (window.klaviyo = window.klaviyo || []).push(["identify", { email: email }]); } catch (e) {}
    try { if (window.dnMetaLead) window.dnMetaLead(source); } catch (e) {}   // Meta pixel Lead (js/meta-pixel.js)
  }

  /* Resolves when the signup is safely recorded somewhere. */
  window.DenadaList = {
    subscribe: function (form) {
      var email = (form.querySelector("[name=email]") || {}).value || "";
      var source = sourceFor(form);
      if (looksLikeBot(form, email)) return Promise.resolve();     // quiet success, nothing recorded
      return klaviyo(email, source).then(
        function () {
          netlify(form).catch(function () {});                     // backup copy; best effort
          remember(email, source);
        },
        function () { return netlify(form).then(function () { remember(email, source); }); } // Klaviyo unavailable: Netlify must succeed
      );
    }
  };
})();
