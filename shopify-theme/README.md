# Shopify Storefront Branding — Audit & Install

The website at `denadatequila.com` and the store at `shop.denadatequila.com` are
two separate codebases. Rebranding the website did nothing to the store, which
is why `/collections/all` still looks like the old site.

This folder rebrands the Shopify side to match.

| File | What it is |
|---|---|
| `denada-brand.css` | Drop-in stylesheet. Restyles every themed storefront page. |
| `denada-wordmark.png` | The site wordmark, 259×140, transparent. Upload as the theme logo. |
| `denada-wordmark.webp` | Same image, smaller. Use if the theme accepts webp. |

---

## Install (15 minutes)

Do all of this on a **draft theme**, not the published one.

1. **Duplicate the live theme** — Online Store → Themes → … → Duplicate. Leave
   the copy under *Draft themes*.
2. **Paste the CSS** — on the draft theme: Customize → Theme settings →
   **Custom CSS** → paste all of `denada-brand.css`.
3. **Upload the logo** — Customize → Theme settings → Logo → upload
   `denada-wordmark.png`. Set max width to about 180px.
4. **Set the favicon** — Theme settings → Favicon. Use `favicon.png` from the
   repo root so the browser tab matches the website.
5. **Brand the checkout** — see the table below. This is a separate screen and
   it is the step people skip.
6. **Preview** and walk the checklist at the bottom.

---

## Every page in the shop experience

The important thing here: **CSS only reaches the themed pages.** Checkout and
email are rendered by Shopify outside the theme, and need branding of their
own. A store with a beautiful catalog and a stock-blue checkout is the usual
result of missing that distinction.

### Themed — covered by `denada-brand.css`

| Page | URL | Notes |
|---|---|---|
| Catalog | `/collections/all` | The page you flagged. Cards, prices, buttons. |
| Collection | `/collections/<handle>` | Same styling as catalog. |
| Product | `/products/<handle>` | Shoppers can land here from search or a direct link, so it must be branded even though your site has its own product pages. |
| Cart | `/cart` | Also the cart **drawer**, if the theme uses one. |
| Search | `/search` | |
| Policy pages | `/policies/*` | Refund, privacy, terms, shipping. |
| Content pages | `/pages/*` | |
| Account | `/account`, `/account/login`, `/account/register`, `/account/orders`, `/account/addresses` | Easy to forget; customers see these after ordering. |
| 404 | any bad URL | |
| Password page | store root, if password protection is on | |

### Not themed — branded elsewhere

| Surface | Where to brand it | Notes |
|---|---|---|
| **Checkout** | Settings → Checkout → **Branding** | Logo, colours, fonts, button shape. Set background `#F3F8E4`, buttons `#018769`, text `#231F20`, accent `#D37240`. On non-Plus plans this editor is the only control — no custom CSS. |
| **Order status / thank-you page** | Same checkout branding | Inherits from the checkout branding editor. |
| **Email notifications** | Settings → **Notifications** → each template | Order confirmation, shipping confirmation, refund, abandoned cart. Each is its own Liquid/HTML template. At minimum swap the logo and accent colour. Customers see these more than any page on the site. |
| **Accelerated checkout buttons** | Not controllable | Shop Pay, Google Pay and PayPal render in Shopify-controlled iframes. The CSS squares off the wrapper; the buttons keep their own brand colours. Expected. |
| **Shopify order emails from apps** | Each app's own settings | If you run a shipping or review app that emails customers. |

---

## Cross-check before it goes live

Walk these on the draft theme preview. Every one should read as De Nada —
cream `#F3F8E4` ground, green `#018769` buttons with hard black borders and
offset shadows, Oswald uppercase headings.

- [ ] `/collections/all` — cards have 2px black borders and offset shadows
- [ ] A product page — price in Oswald, Add to Cart is green with a black border
- [ ] `/cart` with an item in it — totals, quantity stepper, checkout button
- [ ] `/cart` empty — the empty-state message is serif italic
- [ ] Cart drawer, if the theme has one
- [ ] Header — logo is the wordmark, nav is Oswald uppercase
- [ ] Footer — green ground, cream text
- [ ] `/search` with a query, and with no results
- [ ] `/account/login`
- [ ] A `/policies/` page
- [ ] A 404
- [ ] **Checkout** — reached with a real add-to-cart. Logo present, colours right
- [ ] **Order confirmation email** — send a test from Settings → Notifications
- [ ] Mobile width on all of the above

---

## Navigation: point the store back at the website

Separate from visual branding, and the thing that actually breaks the
experience. Once `denadatequila.com` is the main site, the Shopify store should
behave as **checkout only**. Every navigation element on it is currently an exit
into a parallel, outdated storefront.

| Element | Where | Should point to |
|---|---|---|
| "Continue shopping" on the cart | `main-cart-items.liquid` or `cart-drawer.liquid` | `https://denadatequila.com/shop.html` |
| Header logo | Theme settings, or `header.liquid` | `https://denadatequila.com` |
| Header menu | Navigation → Main menu | Website URLs, not store collections |
| Footer menu | Navigation → Footer menu | Website URLs |
| Empty-cart button | cart template | `https://denadatequila.com/shop.html` |
| Post-purchase "Continue shopping" | Settings → Checkout | `https://denadatequila.com` |

Leaving these pointed inward is what produces the bug already reported: add to
cart, press Continue shopping, land somewhere that is not your site.

---

## Notes

- Selectors target Dawn and Online Store 2.0 conventions plus generic
  fallbacks. If an element does not pick up the styling, inspect it and add its
  class to the nearest block in the CSS. The custom properties at the top of the
  file are the single source of truth for colour.
- The CSS uses `!important` in places. Theme stylesheets load after custom CSS
  and are highly specific, so overriding them requires it.
- Brand tokens, taken from the website:

  | Token | Hex | Use |
  |---|---|---|
  | cream | `#F3F8E4` | page background |
  | green | `#018769` | primary buttons, headings, footer |
  | orange | `#D37240` | secondary buttons, badges |
  | burnt | `#B83F26` | sale prices, link hover |
  | black | `#231F20` | text, borders, shadows |
  | gray | `#4A4B4C` | secondary text |
  | gold | `#C5A24E` | accents |

  Type: **Oswald** headings and buttons, **Libre Franklin** body,
  **EB Garamond** italic accents, **Caveat** handwritten notes.
