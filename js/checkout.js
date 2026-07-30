/* ============================================================================
   DE NADA TEQUILA — CART + CHECKOUT
   ----------------------------------------------------------------------------
   Reads js/shop-config.js. E-commerce team: you should not need to edit this
   file — variant IDs live in shop-config.js.

   Flow: product page -> Add to Cart (stored in this browser) -> cart.html ->
   Checkout -> Shopify secure checkout with every item and quantity prefilled,
   via a Shopify cart permalink:

     https://<store>/cart/<variantId>:<qty>,<variantId>:<qty>

   Payment, shipping, tax, and age/ID verification on delivery are all handled
   by Shopify. No customer or payment data is ever collected on this site.
   ============================================================================ */
(function () {
  "use strict";

  var CFG = window.DENADA_SHOP || { products: {}, storeUrl: "#", storeDomain: "" };
  var KEY = "dn_cart_v1";

  /* ---------------------------------------------------------------- storage */
  function readCart() {
    try {
      var raw = localStorage.getItem(KEY);
      var obj = raw ? JSON.parse(raw) : {};
      // drop anything that is no longer a known product or a sane quantity
      var clean = {};
      Object.keys(obj).forEach(function (k) {
        var q = parseInt(obj[k], 10);
        if (CFG.products[k] && q > 0) clean[k] = Math.min(q, 99);
      });
      return clean;
    } catch (e) { return {}; }
  }

  function writeCart(cart) {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {}
    paintCount();
  }

  function count(cart) {
    cart = cart || readCart();
    return Object.keys(cart).reduce(function (n, k) { return n + cart[k]; }, 0);
  }

  /* ------------------------------------------------------------------ money */
  function priceOf(sku) {
    var p = CFG.products[sku];
    return p ? parseFloat(p.price || "0") : 0;
  }

  function money(n) {
    return "$" + n.toFixed(2);
  }

  /* -------------------------------------------------------------- checkout */
  // Items that can go through Shopify checkout (have a variant ID).
  function checkoutable(cart) {
    return Object.keys(cart).filter(function (k) {
      return CFG.products[k] && String(CFG.products[k].variantId || "").trim() !== "";
    });
  }

  function checkoutUrl(cart) {
    var parts = checkoutable(cart).map(function (k) {
      return String(CFG.products[k].variantId).trim() + ":" + cart[k];
    });
    if (!parts.length) return null;
    var url = "https://" + CFG.storeDomain + "/cart/" + parts.join(",");
    if (CFG.utm) url += "?" + CFG.utm;
    return url;
  }

  /* Where a single product's Buy button should go, given how much of that
     product has been set up in Shopify yet. */
  function buyTarget(sku) {
    var p = CFG.products[sku] || {};
    if (String(p.variantId || "").trim()) return { mode: "checkout", url: null };
    if (String(p.productUrl || "").trim()) return { mode: "product", url: p.productUrl };
    return { mode: "store", url: CFG.storeUrl };
  }

  /* ----------------------------------------------------------------- badge */
  function paintCount() {
    var n = count();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = n > 0 ? String(n) : "";
      el.style.display = n > 0 ? "inline-block" : "none";
    });
  }

  /* ------------------------------------------------------------ public API */
  var API = {
    add: function (sku, qty) {
      qty = Math.max(1, parseInt(qty, 10) || 1);
      var cart = readCart();
      cart[sku] = Math.min((cart[sku] || 0) + qty, 99);
      writeCart(cart);
      return cart;
    },
    setQty: function (sku, qty) {
      var cart = readCart();
      qty = parseInt(qty, 10) || 0;
      if (qty > 0) cart[sku] = Math.min(qty, 99); else delete cart[sku];
      writeCart(cart);
      return cart;
    },
    remove: function (sku) {
      var cart = readCart();
      delete cart[sku];
      writeCart(cart);
      return cart;
    },
    read: readCart,
    count: count,
    subtotal: function (cart) {
      cart = cart || readCart();
      return Object.keys(cart).reduce(function (s, k) { return s + priceOf(k) * cart[k]; }, 0);
    },
    money: money,
    checkoutUrl: checkoutUrl,
    checkoutable: checkoutable,
    buyTarget: buyTarget,
    config: CFG
  };
  window.DenadaCart = API;

  /* --------------------------------------------------- product page wiring */
  function wireProductPage() {
    var root = document.querySelector("[data-sku]");
    if (!root) return;
    var sku = root.getAttribute("data-sku");
    var target = buyTarget(sku);

    var qtyInput = document.getElementById("qty");
    function qty() { return Math.max(1, parseInt(qtyInput && qtyInput.value, 10) || 1); }

    document.querySelectorAll("[data-qty-step]").forEach(function (b) {
      b.addEventListener("click", function () {
        var step = parseInt(b.getAttribute("data-qty-step"), 10);
        qtyInput.value = Math.min(99, Math.max(1, qty() + step));
      });
    });

    var addBtn = document.getElementById("add-to-cart");
    var buyBtn = document.getElementById("buy-now");
    var note   = document.getElementById("buy-note");

    if (target.mode === "checkout") {
      addBtn.addEventListener("click", function () {
        API.add(sku, qty());
        addBtn.textContent = "Added ✓";
        setTimeout(function () { addBtn.textContent = "Add to Cart"; }, 1600);
      });
      buyBtn.addEventListener("click", function () {
        var one = {}; one[sku] = qty();
        var url = checkoutUrl(one);
        if (url) window.location.href = url;
      });
    } else {
      // Not set up in Shopify yet: send shoppers to the store instead of
      // pretending to have a cart we cannot check out.
      addBtn.style.display = "none";
      buyBtn.textContent = target.mode === "product" ? "Buy on Our Shop" : "Shop This";
      buyBtn.addEventListener("click", function () { window.location.href = target.url; });
      if (note) {
        note.textContent = "Checkout is handled by our secure Shopify store.";
        note.style.display = "block";
      }
    }
  }

  /* ------------------------------------------------------ cart page wiring */
  function wireCartPage() {
    var wrap = document.getElementById("cart-lines");
    if (!wrap) return;

    var IMG = {
      "blanco": "img/blanco.webp",
      "reposado": "img/reposado.webp",
      "anejo": "img/anejo.webp",
      "aluminum-blanco": "img/aluminum-blanco.webp",
      "aluminum-reposado": "img/aluminum-reposado.webp"
    };
    var SWATCH = {
      "blanco": "var(--turquoise)", "reposado": "var(--orange)", "anejo": "var(--black)",
      "aluminum-blanco": "var(--turquoise)", "aluminum-reposado": "var(--orange)"
    };
    var HREF = {
      "blanco": "product-blanco.html", "reposado": "product-reposado.html",
      "anejo": "product-anejo.html",
      "aluminum-blanco": "product-aluminum-blanco.html",
      "aluminum-reposado": "product-aluminum-reposado.html"
    };

    function render() {
      var cart = readCart();
      var keys = Object.keys(cart);
      var empty = document.getElementById("cart-empty");
      var body  = document.getElementById("cart-body");

      if (!keys.length) {
        empty.style.display = "block";
        body.style.display = "none";
        return;
      }
      empty.style.display = "none";
      body.style.display = "block";

      wrap.innerHTML = keys.map(function (k) {
        var p = CFG.products[k];
        return '' +
          '<div class="c-line">' +
            '<a class="c-thumb" href="' + HREF[k] + '" style="background:' + SWATCH[k] + '">' +
              '<img src="' + IMG[k] + '" alt="' + p.name + '">' +
            '</a>' +
            '<div class="c-info">' +
              '<a class="c-name" href="' + HREF[k] + '">' + p.name + '</a>' +
              '<div class="c-unit">' + money(priceOf(k)) + ' each</div>' +
              '<button class="c-remove" data-remove="' + k + '">Remove</button>' +
            '</div>' +
            '<div class="c-qty">' +
              '<button data-line-step="-1" data-line="' + k + '" aria-label="Decrease quantity">&minus;</button>' +
              '<input type="number" min="1" max="99" value="' + cart[k] + '" data-line-input="' + k + '" aria-label="Quantity">' +
              '<button data-line-step="1" data-line="' + k + '" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<div class="c-total">' + money(priceOf(k) * cart[k]) + '</div>' +
          '</div>';
      }).join("");

      document.getElementById("cart-subtotal").textContent = money(API.subtotal(cart));

      // Checkout availability depends on which SKUs have variant IDs yet.
      var ready = checkoutable(cart);
      var btn = document.getElementById("checkout-btn");
      var warn = document.getElementById("cart-warn");
      if (ready.length === keys.length) {
        btn.style.display = "";
        btn.href = checkoutUrl(cart);
        warn.style.display = "none";
      } else if (ready.length > 0) {
        btn.style.display = "";
        btn.href = checkoutUrl(cart);
        warn.style.display = "block";
        warn.innerHTML = "Some bottles in your cart are not available for online checkout yet. " +
          "Checking out will take the available ones through; for the rest, visit " +
          '<a href="' + CFG.storeUrl + '">our shop</a>.';
      } else {
        btn.style.display = "none";
        warn.style.display = "block";
        warn.innerHTML = 'These bottles are not available for online checkout yet. ' +
          'Please visit <a href="' + CFG.storeUrl + '">our shop</a>.';
      }
    }

    wrap.addEventListener("click", function (e) {
      var rm = e.target.closest("[data-remove]");
      if (rm) { API.remove(rm.getAttribute("data-remove")); render(); return; }
      var step = e.target.closest("[data-line-step]");
      if (step) {
        var sku = step.getAttribute("data-line");
        var d = parseInt(step.getAttribute("data-line-step"), 10);
        API.setQty(sku, (readCart()[sku] || 0) + d);
        render();
      }
    });

    wrap.addEventListener("change", function (e) {
      var inp = e.target.closest("[data-line-input]");
      if (inp) { API.setQty(inp.getAttribute("data-line-input"), inp.value); render(); }
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    paintCount();
    wireProductPage();
    wireCartPage();
  });
})();
