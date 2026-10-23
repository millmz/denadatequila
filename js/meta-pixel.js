/* ============================================================================
   DE NADA TEQUILA — META (FACEBOOK / INSTAGRAM) PIXEL
   ----------------------------------------------------------------------------
   Loads the Meta pixel on every page that includes this file, when an ID is
   set in js/list-config.js (metaPixelId). Nothing loads while it is empty.

   Events sent:
     PageView     every page
     ViewContent  product pages (bottle, price), for retargeting and
                  optimisation of the ads
     Lead         any signup form on the site, fired from js/signup.js
                  after the signup succeeds (window.dnMetaLead)

   Purchases are reported by Shopify's own Meta integration on the checkout
   domain, not from here.
   ============================================================================ */
(function () {
  "use strict";
  var id = (window.DENADA_LIST || {}).metaPixelId;
  if (!id) return;

  /* Meta's standard loader. */
  !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  fbq("init", id);
  fbq("track", "PageView");

  /* Product pages: ViewContent with the bottle and its price. */
  var info = document.querySelector(".pdp-info[data-sku]");
  var SHOP = window.DENADA_SHOP || { products: {} };
  if (info) {
    var key = info.getAttribute("data-sku");
    var p = SHOP.products[key];
    if (p) {
      fbq("track", "ViewContent", {
        content_name: "De Nada Tequila " + p.name,
        content_ids: [p.variantId || key],
        content_type: "product",
        value: Number(p.price),
        currency: "USD"
      });
    }
  }

  /* Called by js/signup.js after a successful signup. */
  window.dnMetaLead = function (source) {
    try { fbq("track", "Lead", { content_name: source || "signup" }); } catch (e) {}
  };
})();
