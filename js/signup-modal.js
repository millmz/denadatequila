/* ============================================================================
   DE NADA TEQUILA — GUEST LIST MODAL
   ----------------------------------------------------------------------------
   A small signup card that appears once, after the age gate, when the reader
   has been on the page for 25 seconds, scrolled past 60%, or moved the mouse
   up toward the address bar. It offers the five easiest recipes in the book;
   Welcome 1 delivers them by email, and the card shows the links right away.

   Never shows: on welcome.html, to visitors arriving from an email
   (utm_source=klaviyo), to anyone who has already signed up on this device
   (dn_subscribed), or more than once every 30 days (dn_modal_seen).
   Needs js/list-config.js and js/signup.js loaded first.
   ============================================================================ */
(function () {
  "use strict";
  var SEEN = "dn_modal_seen", SUB = "dn_subscribed", DAYS = 30;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var q;
  try { q = new URLSearchParams(location.search); } catch (e) { q = { get: function () { return ""; } }; }
  if (/welcome\.html$/.test(location.pathname)) return;
  if ((q.get("utm_source") || "").toLowerCase() === "klaviyo") return;
  if ((q.get("utm_medium") || "").toLowerCase() === "email") return;
  if (get(SUB)) return;
  if (Number(get(SEEN) || 0) > Date.now() - DAYS * 864e5) return;
  if (!window.DenadaList) return;

  var RECIPES = [
    ["Tommy’s Margarita", "tommys-margarita", "Blanco, lime, agave"],
    ["De Nada Paloma", "de-nada-paloma", "Blanco, grapefruit, lime, soda"],
    ["Garden Party", "garden-party", "Blanco, lime, cilantro, jalapeño"],
    ["Tequila Sunrise", "tequila-sunrise", "Blanco, orange, lime, a cherry"],
    ["Mexican Style Old Fashioned", "mexican-style-old-fashioned", "Reposado, mezcal, agave, bitters"]
  ];

  var CSS = "#dn-modal{position:fixed;inset:0;z-index:900;background:rgba(35,31,32,.62);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .3s ease}" +
    "#dn-modal.in{opacity:1}" +
    "#dn-modal .dn-md{position:relative;width:100%;max-width:500px;background:#F3F8E4;border:2px solid #231F20;box-shadow:8px 8px 0 #231F20;padding:12px;transform:translateY(12px);transition:transform .3s ease}" +
    "#dn-modal.in .dn-md{transform:none}" +
    "#dn-modal .dn-in{border:1px solid #231F20;padding:36px 30px 28px;text-align:center}" +
    "#dn-modal .dn-x{position:absolute;top:2px;right:2px;width:40px;height:40px;border:0;background:transparent;color:#231F20;font-size:26px;line-height:40px;cursor:pointer}" +
    "#dn-modal .dn-eb{font-family:'Oswald',sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.24em;font-size:.7rem;color:#B83F26}" +
    "#dn-modal .dn-h{font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.04em;font-size:1.6rem;line-height:1.1;color:#017A5F;margin:10px 0 0}" +
    "#dn-modal .dn-s{font-family:'EB Garamond',serif;font-style:italic;font-size:1.1rem;color:#4A4B4C;margin:10px 0 0}" +
    "#dn-modal .dn-p{font-family:'Libre Franklin',sans-serif;font-size:.93rem;line-height:1.55;color:#231F20;margin:14px 0 20px}" +
    "#dn-modal form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}" +
    "#dn-modal input[type=email]{font-family:'Libre Franklin',sans-serif;font-size:.95rem;padding:13px 16px;flex:1 1 220px;min-width:0;border:2px solid #231F20;background:#FBFDF3;color:#231F20}" +
    "#dn-modal input:focus{outline:3px solid #E0B45A;outline-offset:2px}" +
    "#dn-modal .dn-btn{font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.14em;font-size:.8rem;padding:13px 24px;border:2px solid #231F20;background:#D37240;color:#231F20;box-shadow:3px 3px 0 #231F20;cursor:pointer}" +
    "#dn-modal .dn-btn[disabled]{opacity:.7;cursor:default}" +
    "#dn-modal .dn-fine{font-family:'Libre Franklin',sans-serif;font-size:.72rem;color:#4A4B4C;margin:16px 0 0}" +
    "#dn-modal .dn-list{list-style:none;margin:18px 0 0;padding:0;text-align:left;border:2px solid #231F20;background:#FBFDF3}" +
    "#dn-modal .dn-list li{padding:10px 14px;border-top:1px solid rgba(35,31,32,.2);font-family:'Libre Franklin',sans-serif;font-size:.88rem;color:#4A4B4C}" +
    "#dn-modal .dn-list li:first-child{border-top:0}" +
    "#dn-modal .dn-list a{font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.06em;font-size:.82rem;color:#017A5F;text-decoration:none;display:block}" +
    "#dn-modal .dn-list a:hover{text-decoration:underline}" +
    "@media(max-width:480px){#dn-modal .dn-in{padding:30px 18px 24px}#dn-modal .dn-h{font-size:1.35rem}}";

  var shown = false, lastFocus = null;

  function ageGateOpen() {
    var g = document.getElementById("agegate");
    return !!g && g.style.display === "flex";
  }

  function onKey(e) { if (e.key === "Escape") close(); }

  function close() {
    var wrap = document.getElementById("dn-modal");
    if (!wrap) return;
    wrap.classList.remove("in");
    document.removeEventListener("keydown", onKey);
    setTimeout(function () { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }, 300);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  function success(wrap) {
    var inner = wrap.querySelector(".dn-in");
    var items = RECIPES.map(function (r) {
      return '<li><a href="cocktails.html#' + r[1] + '">' + r[0] + '</a>' + r[2] + '</li>';
    }).join("");
    inner.innerHTML =
      '<div class="dn-eb">The Guest List</div>' +
      '<h2 class="dn-h" id="dn-modal-h">You’re in. De Nada.</h2>' +
      '<p class="dn-s">The five are on their way to your inbox. Or start here:</p>' +
      '<ul class="dn-list">' + items + '</ul>' +
      '<p class="dn-p" style="margin-bottom:0"><button class="dn-btn" type="button">Back to the site</button></p>';
    inner.querySelector(".dn-btn").addEventListener("click", close);
  }

  function build() {
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    var wrap = document.createElement("div");
    wrap.id = "dn-modal";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "dn-modal-h");
    wrap.innerHTML =
      '<div class="dn-md"><button class="dn-x" type="button" aria-label="Close">&times;</button><div class="dn-in">' +
      '<div class="dn-eb">The Guest List</div>' +
      '<h2 class="dn-h" id="dn-modal-h">The five easiest drinks in the book.</h2>' +
      '<p class="dn-s">Sent to your inbox, with the full recipe for each.</p>' +
      '<p class="dn-p">Then a new drink every two weeks, and first word on new bottles. No noise. That wouldn’t be very hospitable.</p>' +
      '<form name="rsvp" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field">' +
      '<input type="hidden" name="form-name" value="rsvp"><input type="hidden" name="source" value="modal">' +
      '<p style="display:none"><label>Don’t fill this out: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>' +
      '<input type="email" name="email" placeholder="Your email address" aria-label="Email address" required autocomplete="email">' +
      '<button class="dn-btn" type="submit">Send them</button></form>' +
      '<p class="dn-fine">Must be 21+. One click to unsubscribe, any time.</p>' +
      '</div></div>';
    document.body.appendChild(wrap);
    lastFocus = document.activeElement;
    requestAnimationFrame(function () { wrap.classList.add("in"); });

    var input = wrap.querySelector("input[type=email]");
    setTimeout(function () { try { input.focus({ preventScroll: true }); } catch (e) {} }, 350);

    wrap.querySelector(".dn-x").addEventListener("click", close);
    wrap.addEventListener("click", function (e) { if (e.target === wrap) close(); });
    document.addEventListener("keydown", onKey);

    wrap.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var form = e.target, btn = form.querySelector(".dn-btn");
      btn.disabled = true; btn.textContent = "One sec…";
      window.DenadaList.subscribe(form).then(
        function () { put(SUB, "1"); success(wrap); },
        function () { btn.disabled = false; btn.textContent = "Send them"; alert("Something hiccuped. Try again?"); }
      );
    });
  }

  function show() {
    if (shown) return;
    if (ageGateOpen()) { setTimeout(show, 2000); return; }
    shown = true;
    put(SEEN, String(Date.now()));
    build();
  }

  setTimeout(show, 25000);
  document.documentElement.addEventListener("mouseleave", function (e) { if (e.clientY <= 0) show(); });
  window.addEventListener("scroll", function onScroll() {
    var d = document.documentElement;
    if ((window.scrollY + window.innerHeight) / d.scrollHeight > 0.6) {
      window.removeEventListener("scroll", onScroll);
      show();
    }
  }, { passive: true });
})();
