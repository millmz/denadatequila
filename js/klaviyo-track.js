/* ============================================================================
   DE NADA TEQUILA — KLAVIYO ONSITE TRACKING
   ----------------------------------------------------------------------------
   Loads Klaviyo's onsite script (Active on Site) and, on product pages,
   records a "Viewed Product" event so Klaviyo can run browse-abandonment and
   cross-sell flows. Klaviyo only attributes these events to people it can
   recognise: someone who arrived from one of our emails, or who has signed up
   on this site (signup.js identifies them after a successful signup).

   Reads js/list-config.js (company id) and js/shop-config.js (prices, ids).
   Product pages mark themselves with  <div class="pdp-info" data-sku="blanco">.
   Nothing here touches the cart or checkout.
   ============================================================================ */
(function () {
  "use strict";
  var LIST = window.DENADA_LIST || {};
  var SHOP = window.DENADA_SHOP || { products: {} };
  var company = LIST.klaviyoCompanyId;
  if (!company) return;

  /* Klaviyo's queue. Calls made before the script loads are replayed later. */
  window.klaviyo = window.klaviyo || [];

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://static.klaviyo.com/onsite/js/" + encodeURIComponent(company) + "/klaviyo.js";
  document.head.appendChild(s);

  /* Identify a visitor we already know (set by signup.js after a signup). */
  var known = "";
  try { known = localStorage.getItem("dn_email") || ""; } catch (e) {}
  if (known) window.klaviyo.push(["identify", { email: known }]);

  /* Viewed Product, on product pages only. */
  var info = document.querySelector(".pdp-info[data-sku]");
  if (!info) return;
  var key = info.getAttribute("data-sku");
  var p = SHOP.products[key];
  if (!p) return;

  var hero = document.querySelector(".pdp-media img");
  var item = {
    ProductName: "De Nada Tequila " + p.name,
    ProductID: p.variantId || key,
    SKU: key,
    Categories: ["Tequila"],
    ImageURL: hero ? hero.currentSrc || hero.src : "",
    URL: location.origin + location.pathname,
    Brand: "De Nada Tequila",
    Price: Number(p.price),
    CompareAtPrice: Number(p.price)
  };
  window.klaviyo.push(["track", "Viewed Product", item]);
  window.klaviyo.push(["trackViewedItem", {
    Title: item.ProductName,
    ItemId: item.ProductID,
    Categories: item.Categories,
    ImageUrl: item.ImageURL,
    Url: item.URL,
    Metadata: { Brand: item.Brand, Price: item.Price, CompareAtPrice: item.CompareAtPrice }
  }]);
})();
