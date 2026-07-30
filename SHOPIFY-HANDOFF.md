# Shop & Checkout — E-Commerce Handoff

Everything on the website is built and working. To turn the Buy buttons on, you
only need to paste Shopify variant IDs into **one file**.

---

## TL;DR

1. Open **`js/shop-config.js`**
2. Paste each product's Shopify **variant ID** into its `variantId: ""`
3. Commit / deploy

That's the whole job. No HTML to touch, no other files.

---

## The five SKUs

| Key in config | Product | Size | Site price | Product page |
|---|---|---|---|---|
| `blanco` | Blanco | 700mL | $54.99 | `product-blanco.html` |
| `reposado` | Reposado | 700mL | $59.99 | `product-reposado.html` |
| `anejo` | Añejo | 700mL | $79.99 | `product-anejo.html` |
| `aluminum-blanco` | The Original Blanco (aluminum) | 700mL | $41.99 | `product-aluminum-blanco.html` |
| `aluminum-reposado` | The Original Reposado (aluminum) | 700mL | $45.99 | `product-aluminum-reposado.html` |

Prices shown on the site come from `js/shop-config.js` too — keep them in sync
with Shopify so the cart subtotal matches what customers see at checkout.

---

## How to find a variant ID

Shopify admin → **Products** → open the product → scroll to **Variants** →
click the variant. The URL ends with the variant ID:

```
.../products/1234567890/variants/44445556667778
                                 ^^^^^^^^^^^^^^  ← this number
```

Paste it as a string:

```js
"blanco": {
  name: "Blanco",
  price: "54.99",
  variantId: "44445556667778",   // ← here
  productUrl: ""
},
```

### Verify an ID before you ship it

Paste this into a browser. If it lands in checkout with the right bottle, the
ID is correct:

```
https://shop.denadatequila.com/cart/PASTE_VARIANT_ID:1
```

---

## The customer flow

```
shop.html                 → grid of all five bottles
   ↓ Buy
product-*.html            → full product page: tasting notes, specs,
                            quantity selector, Add to Cart / Buy Now
   ↓ Add to Cart                    ↓ Buy Now
cart.html                 → review, change quantities, remove
   ↓ Checkout
Shopify secure checkout   → payment, shipping, tax, 21+ signature
```

**Buy Now** skips the cart and goes straight to Shopify checkout with that one
item. **Add to Cart** lets a customer collect several bottles, then hands the
whole order to Shopify in a single link.

The site never collects payment or customer data. Shopify handles all of it.
The handoff uses a standard Shopify cart permalink:

```
https://shop.denadatequila.com/cart/<variantId>:<qty>,<variantId>:<qty>
```

---

## Nothing breaks while you're mid-setup

Each product falls back on its own, so you can turn SKUs on one at a time:

| State of the config | What the customer sees |
|---|---|
| `variantId` filled in | Add to Cart + Buy Now → Shopify checkout |
| `variantId` empty, `productUrl` filled in | Single button: **Buy on Our Shop** → that Shopify product page |
| both empty | Single button: **Shop This** → the store homepage |

The two aluminum SKUs already have `productUrl` pre-filled with their existing
Shopify pages, so those buttons work right now.

If someone has a bottle in their cart that later loses its variant ID, the cart
warns them and checks out the rest rather than failing silently.

---

## Attribution

Checkout links carry UTM parameters so Shopify analytics can attribute these
orders to the website:

```
utm_source=website&utm_medium=shop&utm_campaign=dtc
```

Change or clear this in the `utm` field of `js/shop-config.js`.

---

## Files

| File | What it is |
|---|---|
| `js/shop-config.js` | **The only file you edit.** Variant IDs, prices, store URL. |
| `js/checkout.js` | Cart + checkout logic. No need to touch. |
| `product-*.html` | The five product pages. |
| `cart.html` | Cart page. |
| `shop.html` | Shop grid; Buy buttons link to the product pages. |
| `img/*.webp` | Bottle images used by product pages and the cart. |

---

## Notes / open items

- **Prices live in two places** — `js/shop-config.js` (what the site shows) and
  Shopify (what customers actually pay). Keep them matched.
- **The cart is per-browser** (localStorage). It does not sync across devices,
  which is normal for this kind of static-site + Shopify setup.
- **Shipping rules, state restrictions, and 21+ signature** are all configured
  on the Shopify side, not here.
