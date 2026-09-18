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

  /* Resolves when the signup is safely recorded somewhere. */
  window.DenadaList = {
    subscribe: function (form) {
      var email = (form.querySelector("[name=email]") || {}).value || "";
      var source = sourceFor(form);
      return klaviyo(email, source).then(
        function () { netlify(form).catch(function () {}); },   // backup copy; best effort
        function () { return netlify(form); }                    // Klaviyo unavailable: Netlify must succeed
      );
    }
  };
})();
