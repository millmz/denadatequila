/* ============================================================================
   DE NADA TEQUILA — SHOPIFY CHECKOUT CONFIG
   ----------------------------------------------------------------------------
   E-COMMERCE TEAM: this is the ONLY file you need to edit.

   For each product below, paste the Shopify VARIANT ID into `variantId`.
   Nothing else needs to change. Every Buy button, the cart, and checkout
   on the website read from this file.

   HOW TO FIND A VARIANT ID
   ------------------------
   Shopify admin > Products > (open the product) > scroll to Variants >
   click the variant. The URL ends in the variant ID, for example:

     .../products/1234567890/variants/44445556667778
                                       ^^^^^^^^^^^^^^ this number

   Paste that number as a string:  variantId: "44445556667778"

   WHERE THE CART LIVES
   --------------------
   On Shopify, not on this site. This site has product pages; Shopify owns the
   cart and the checkout, so there is only ever one cart and it is always the
   real one. The buttons hand off to Shopify:

     Add to Cart  ->  /cart/add?id=<variantId>&quantity=<n>&return_to=/cart
                      adds the item, then shows the Shopify cart page
     Buy It Now   ->  /cart/<variantId>:<n>
                      straight into Shopify checkout

   HOW THE BUTTONS BEHAVE
   ----------------------
   The site falls back gracefully, so nothing is ever broken mid-setup:

     1. variantId filled in   -> Add to Cart and Buy It Now both work.
     2. no variantId, but
        productUrl filled in  -> one button linking to that Shopify product page.
     3. neither filled in     -> one button linking to the store homepage
                                 (storeUrl below), reading "Shop This".

   So you can fill these in one at a time as SKUs go live.

   TESTING A VARIANT ID WITHOUT TOUCHING THE SITE
   ----------------------------------------------
   Paste this in a browser. If it lands in checkout with the right bottle,
   the ID is correct:

     https://shop.denadatequila.com/cart/PASTE_VARIANT_ID:1

   ============================================================================ */

window.DENADA_SHOP = {

  /* Your Shopify storefront domain. No https://, no trailing slash. */
  storeDomain: "shop.denadatequila.com",

  /* Where Buy buttons point until a product has been set up. */
  storeUrl: "https://shop.denadatequila.com/",

  /* Appended to checkout links so Shopify analytics attributes these orders
     to the website. Set to "" to turn off. */
  utm: "utm_source=website&utm_medium=shop&utm_campaign=dtc",

  /* --------------------------------------------------------------------------
     DRAFT THEME PREVIEW — the staging switch
     --------------------------------------------------------------------------
     While this holds a theme ID, every Buy button lands on Shopify rendered in
     that DRAFT theme instead of the live storefront. Checkout still works, so
     the whole flow is testable end to end before anything ships.

     Find the ID in Shopify admin > Online Store > Themes > (draft theme) >
     ... > Preview. The preview URL contains it:

       https://shop.denadatequila.com/?preview_theme_id=123456789012
                                                        ^^^^^^^^^^^^

     GO LIVE: set this back to "" and deploy. That is the whole switch.
     -------------------------------------------------------------------------- */
  previewThemeId: "",

  /* --------------------------------------------------------------------------
     PRODUCTS
     Keys (blanco, reposado, ...) are used by the site. Do not rename them.
     Prices here are what the website displays. Keep them in sync with Shopify.

     STATUS (checked against shop.denadatequila.com/products.json):
       - The two aluminum SKUs exist on Shopify and are wired up below.
       - The three glass SKUs below do NOT exist on Shopify yet. Create them,
         then paste their variant IDs in. Until then their buttons fall back
         to the store homepage, which is the intended safe default.
     -------------------------------------------------------------------------- */
  products: {

    "blanco": {
      name: "Blanco",
      price: "49.99",
      variantId: "",                 // <-- PASTE SHOPIFY VARIANT ID
      productUrl: ""                 // optional Shopify product page
    },

    "reposado": {
      name: "Reposado",
      price: "54.99",
      variantId: "",                 // <-- PASTE SHOPIFY VARIANT ID
      productUrl: ""
    },

    "anejo": {
      name: "Añejo",
      price: "79.99",
      variantId: "",                 // <-- PASTE SHOPIFY VARIANT ID
      productUrl: ""
    },

    /* The original aluminum bottles. These two already exist on Shopify, so
       their product pages are pre-filled and the buttons work today. Add the
       variant IDs when you want them going straight to checkout instead. */
    "aluminum-blanco": {
      name: "The Original Blanco",
      price: "41.99",
      variantId: "49037824852256",   // Shopify SKU 16154, confirmed $41.99
      productUrl: "https://shop.denadatequila.com/products/denada-tequila-blanco"
    },

    "aluminum-reposado": {
      name: "The Original Reposado",
      price: "45.99",
      variantId: "49037825376544",   // Shopify SKU 16153, confirmed $45.99
      productUrl: "https://shop.denadatequila.com/products/denada-tequila-reposado"
    }

  }
};
