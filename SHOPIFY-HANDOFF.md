# Shop & Checkout — E-Commerce Handoff

Everything on the website is built and working. To turn the Buy buttons on, you
only need to paste Shopify variant IDs into **one file**.

---

## TL;DR

1. Open **`js/shop-config.js`**
2. Paste each product's Shopify **variant ID** into its `variantId: ""`
3. Commit / deploy

That's the whole job. No HTML to touch, no other files.

Testing before launch? See **[Testing against a draft theme](#testing-against-a-draft-theme-before-go-live)**
— one extra line in the same file points every button at a draft Shopify theme,
and `shop-preflight.html` verifies the whole set.

---

## Where the cart lives: Shopify

**This site has no cart of its own, on purpose.**

The website owns the product pages. Shopify owns the cart and the checkout,
exactly as it does today. That means there is only ever one cart, and it is
always the real one — correct inventory, correct discounts, and the express
payment options (Google Pay, Shop Pay, and the rest) that Shopify provides.

A second cart living on the website would drift out of sync with Shopify's:
someone adds two bottles here, opens the store, and the cart looks empty or
doubles up at checkout. So the buttons hand off instead.

---

## The customer flow

```
shop.html                     → grid of all five bottles
   ↓ Buy
product-*.html                → product page: tasting notes, process, specs,
                                quantity, Add to Cart / Buy It Now
   ↓ Add to Cart                        ↓ Buy It Now
Shopify cart page             →         Shopify checkout
   ↓ Check out                          (payment, shipping, tax, 21+ signature)
Shopify checkout
```

The two buttons map onto Shopify's own:

| Button | Where it goes |
|---|---|
| **Add to Cart** | `https://shop.denadatequila.com/cart/add?id=<variantId>&quantity=<n>&return_to=/cart` — Shopify adds the item and shows its cart page |
| **Buy It Now** | `https://shop.denadatequila.com/cart/<variantId>:<n>` — Shopify cart permalink, straight into checkout |

No payment or customer data ever touches this site.

---

## The five SKUs

| Key in config | Product | Size | Site price | Product page |
|---|---|---|---|---|
| `blanco` | Blanco | 700mL | $54.99 | `product-blanco.html` |
| `reposado` | Reposado | 700mL | $59.99 | `product-reposado.html` |
| `anejo` | Añejo | 700mL | $79.99 | `product-anejo.html` |
| `aluminum-blanco` | The Original Blanco (aluminum) | 700mL | $41.99 | `product-aluminum-blanco.html` |
| `aluminum-reposado` | The Original Reposado (aluminum) | 700mL | $45.99 | `product-aluminum-reposado.html` |

Prices displayed on the site come from `js/shop-config.js`. Keep them in sync
with Shopify so the product page matches what the customer pays.

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

## Nothing breaks while you're mid-setup

Each product falls back on its own, so you can turn SKUs on one at a time:

| State of the config | What the customer sees |
|---|---|
| `variantId` filled in | **Add to Cart** + **Buy It Now** → Shopify |
| `variantId` empty, `productUrl` filled in | One button: **Buy on Our Shop** → that Shopify product page |
| both empty | One button: **Shop This** → the store homepage |

The two aluminum SKUs already have `productUrl` pre-filled with their existing
Shopify pages, so those buttons work right now.

---

## Testing against a draft theme (before go-live)

The site can hand off to a **draft** Shopify theme instead of the live one, so
the full flow — product page → cart → checkout — is testable while the current
store stays untouched for real customers.

### What has to happen in Shopify (admin clicks, not code)

1. **Online Store → Themes** → on the new theme, **… → Duplicate** if you want a
   scratch copy, then leave it under **Draft themes**. Do *not* publish it.
2. On that draft theme: **… → Preview**. The URL that opens contains the theme ID:

   ```
   https://shop.denadatequila.com/?preview_theme_id=123456789012
                                                    ^^^^^^^^^^^^  ← this number
   ```

3. Send that theme ID to whoever is doing the testing. It is not a secret, and
   it does not affect live shoppers — a draft theme only renders for requests
   that carry the ID.

### What to change on the site

One line in `js/shop-config.js`:

```js
previewThemeId: "123456789012",   // draft theme — testing
```

Every Buy button now lands on Shopify rendered in that draft theme. Checkout
still works normally, so orders can be placed end to end (use a test order or a
100%-off discount code).

### Verifying it

Open **`shop-preflight.html`** in a browser. It reads the live config and shows,
for each SKU, whether its variant ID is set and the exact URL its buttons will
use — with one-click test links for both Add to Cart and Buy It Now. A banner at
the top says whether you're in draft-theme mode or live mode.

The page is `noindex` and is not linked from anywhere on the site.

---

## Going live

Two things, in this order:

1. **Variant IDs are filled in** for every SKU you want purchasable
   (`shop-preflight.html` shows green pills for all of them).
2. **Clear the draft theme switch** in `js/shop-config.js`:

   ```js
   previewThemeId: "",
   ```

3. Publish the new theme in Shopify, and deploy the site.

That's the switch. Until step 2 happens, nothing the site links to touches the
live theme.

---

## Attribution

Handoff links carry UTM parameters so Shopify analytics can attribute these
orders to the website:

```
utm_source=website&utm_medium=shop&utm_campaign=dtc
```

Change or clear this in the `utm` field of `js/shop-config.js`.

---

## Files

| File | What it is |
|---|---|
| `js/shop-config.js` | **The only file you edit.** Variant IDs, prices, store domain, UTM, draft theme ID. |
| `js/checkout.js` | Builds the Shopify handoff URLs. No need to touch. |
| `shop-preflight.html` | Test page: shows every SKU's config state and its live handoff URLs. Not indexed, not linked. |
| `product-*.html` | The five product pages. |
| `shop.html` | Shop grid; Buy buttons link to the product pages. |
| `img/*.webp` | Bottle images used by the product pages. |

---

## Notes / open items

- **Prices live in two places** — `js/shop-config.js` (what the site shows) and
  Shopify (what customers actually pay). Keep them matched.
- **Shipping rules, state restrictions, discount codes, and the 21+ signature**
  are all configured on the Shopify side, not here.
- **Product page imagery** is a single bottle shot per SKU. If you want the
  multi-image gallery the Shopify pages have, send the additional shots and we
  can add a thumbnail strip.
