/* ============================================================================
   DE NADA TEQUILA — SHOPIFY HANDOFF
   ----------------------------------------------------------------------------
   Reads js/shop-config.js. E-commerce team: you should not need to edit this
   file — variant IDs live in shop-config.js.

   THERE IS NO CART ON THIS SITE, BY DESIGN.

   Shopify owns the cart and the checkout. This site owns the product pages.
   Keeping one cart (Shopify's) means cart contents, inventory, discounts, and
   express payment options are always correct and always in one place.

   Product page buttons map onto Shopify's own two buttons:

     Add to Cart  ->  https://<store>/cart/add?id=<variantId>&quantity=<n>&return_to=/cart
                      Shopify adds the item and shows its cart page.

     Buy It Now   ->  https://<store>/cart/<variantId>:<n>
                      Shopify cart permalink, straight into checkout.

   Payment, shipping, tax, discount codes, and the 21+ signature on delivery
   are all handled by Shopify. No customer or payment data touches this site.
   ============================================================================ */
(function () {
  "use strict";

  var CFG = window.DENADA_SHOP || { products: {}, storeUrl: "#", storeDomain: "" };

  function base() { return "https://" + CFG.storeDomain; }

  function previewId() { return String(CFG.previewThemeId || "").trim(); }

  function join(url, param) {
    return url + (url.indexOf("?") === -1 ? "?" : "&") + param;
  }

  /* Shopify renders the draft theme for any request carrying preview_theme_id,
     and sets a cookie so the rest of the session stays in that theme. */
  function withPreview(url) {
    var id = previewId();
    return id ? join(url, "preview_theme_id=" + encodeURIComponent(id)) : url;
  }

  function decorate(url) {
    return withPreview(CFG.utm ? join(url, CFG.utm) : url);
  }

  /* Shopify: add to cart, then land on Shopify's cart page. */
  function addToCartUrl(variantId, qty) {
    return decorate(base() + "/cart/add?id=" + encodeURIComponent(variantId) +
                    "&quantity=" + qty + "&return_to=/cart");
  }

  /* Shopify cart permalink: straight into checkout. */
  function buyNowUrl(variantId, qty) {
    return decorate(base() + "/cart/" + encodeURIComponent(variantId) + ":" + qty);
  }

  /* How far along a product is in Shopify setup decides what its buttons do. */
  function buyTarget(sku) {
    var p = CFG.products[sku] || {};
    if (String(p.variantId || "").trim()) {
      return { mode: "variant", variantId: String(p.variantId).trim() };
    }
    if (String(p.productUrl || "").trim()) {
      return { mode: "product", url: withPreview(p.productUrl) };
    }
    return { mode: "store", url: withPreview(CFG.storeUrl) };
  }

  window.DenadaShop = {
    buyTarget: buyTarget,
    addToCartUrl: addToCartUrl,
    buyNowUrl: buyNowUrl,
    previewThemeId: previewId(),
    config: CFG
  };

  /* --------------------------------------------------- product page wiring */
  function wireProductPage() {
    var root = document.querySelector("[data-sku]");
    if (!root) return;

    var sku    = root.getAttribute("data-sku");
    var target = buyTarget(sku);
    var qtyInp = document.getElementById("qty");
    var addBtn = document.getElementById("add-to-cart");
    var buyBtn = document.getElementById("buy-now");

    function qty() { return Math.min(99, Math.max(1, parseInt(qtyInp && qtyInp.value, 10) || 1)); }

    document.querySelectorAll("[data-qty-step]").forEach(function (b) {
      b.addEventListener("click", function () {
        qtyInp.value = Math.min(99, Math.max(1, qty() + parseInt(b.getAttribute("data-qty-step"), 10)));
      });
    });

    if (target.mode === "variant") {
      addBtn.addEventListener("click", function () {
        window.location.href = addToCartUrl(target.variantId, qty());
      });
      buyBtn.addEventListener("click", function () {
        window.location.href = buyNowUrl(target.variantId, qty());
      });
    } else {
      // Not set up in Shopify yet. The button keeps reading "Add to Cart" and
      // takes the shopper to the store, where they can add it there. Buy It Now
      // is hidden because a direct checkout needs a variant ID.
      buyBtn.style.display = "none";
      addBtn.addEventListener("click", function () { window.location.href = target.url; });
      // The shipping note below the buttons already explains that the cart and
      // checkout live on the store, so nothing extra is shown here.
    }
  }

  document.addEventListener("DOMContentLoaded", wireProductPage);
})();
