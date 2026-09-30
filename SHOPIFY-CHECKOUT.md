# Checkout branding, ready to paste

Checkout is rendered by Shopify outside the theme, so the theme CSS in
`shopify-theme/` never reaches it. Everything below goes into Shopify's own
checkout editor. It takes about twenty minutes and no code.

**Where:** Shopify admin → Settings → Checkout → **Customize** (opens the
checkout and accounts editor) → **Branding** in the left panel. Changes save as
a draft; press **Publish** at the end.

The target, mocked from the website's tokens:

| Desktop | Phone |
|---|---|
| `shopify-theme/checkout-mock.jpg` | `shopify-theme/checkout-mock-phone.jpg` |

---

**Why this is a paste and not a script.** The store is on the Basic plan.
Shopify's checkout branding API (`checkoutBrandingUpsert`) refuses Basic
stores; it is Plus only. The editor in the admin is open to every plan, so
that is where these values go. Checked September 30 against the live store.

## 1. Files to upload

Both files are **already in the store's Files library** (Content → Files,
uploaded September 30 as `denada-checkout-logo.png` and
`denada-checkout-favicon.png`), so in the editor pick them from the library
rather than uploading again.

| Field | File in this repo | Notes |
|---|---|---|
| Logo | `shopify-theme/checkout-logo.png` | Wordmark at 2x (558 × 320, transparent) so it stays sharp on phones. Position **left**, width about **150 px** (the "medium" step if the editor uses steps). |
| Favicon | `shopify-theme/checkout-favicon.png` | Green square with the cream butterfly, 256 × 256. Same mark as the website tab. |

---

## 2. Colours

The names on the left follow the editor's groupings. If your admin labels a
field slightly differently, match by what it controls. If a field is not
offered on your plan, skip it; the rest still lands.

### Backgrounds

| Area | Hex | Why |
|---|---|---|
| Header | `#F3F8E4` | Site cream. |
| Main (the form column) | `#FBFDF3` | The card off-white from the site. Keeps the fields readable and slightly lifts the form off the cream. |
| Order summary | `#F3F8E4` | Cream, so the summary reads as the "page" and the form as the "card", the same relationship as the website. |
| Footer | `#F3F8E4` | Cream. |

### Text

| Field | Hex |
|---|---|
| Headings | `#018769` |
| Body text | `#231F20` |
| Secondary / helper text | `#4A4B4C` |
| Links | `#018769` |

### Buttons

| Field | Hex |
|---|---|
| Primary button background | `#018769` |
| Primary button text | `#F3F8E4` |
| Primary button hover | `#0B4A39` |
| Secondary button background | `#F3F8E4` |
| Secondary button text | `#231F20` |
| Secondary button border | `#231F20` |

### Form fields and controls

| Field | Hex |
|---|---|
| Field background | `#FFFFFF` |
| Field border | `#4A4B4C` |
| Field text | `#231F20` |
| Field label | `#4A4B4C` |
| Focus / selected accent (radio, checkbox, focused border) | `#018769` |
| Selected option background (shipping method, payment method) | `#F3F8E4` |

### Status

| Field | Hex |
|---|---|
| Error | `#B83F26` |
| Success | `#018769` |
| Info | `#4A4B4C` |
| Decorative / accent | `#D37240` |

One note on greens. The website's CSS uses `#017A5F`; the Shopify theme CSS,
the emails and this checkout use `#018769`. They are a hair apart and nobody
will see the difference across a page load, but the checkout should match the
store and the emails it sits between, so use `#018769` here.

---

## 3. Typography

| Field | Value |
|---|---|
| Heading font | **Oswald** (in Shopify's font library) |
| Heading weight | Bold (600) |
| Heading letter case | Uppercase, if the editor offers it |
| Heading size | Base, or one step up if "base" looks small next to the logo |
| Body font | **Libre Franklin** (in Shopify's font library) |
| Body weight | Regular (400) |
| Body size | Base |

If Oswald is missing from the picker on your plan, **Barlow Condensed** bold is
the closest stand-in. If Libre Franklin is missing, use **Archivo** or
**Inter**. Do not use a serif for headings; the website only uses EB Garamond
for italic asides, never for headings.

---

## 4. Shape

| Field | Value |
|---|---|
| Corner radius, buttons | **None** (0) |
| Corner radius, form fields | **None** (0) |
| Corner radius, checkboxes | **None** (0) |
| Form field style | Bordered (labels inside the field, the editor's default) |

Square corners everywhere. The website has no rounded corners on any element,
and this is the single setting that makes a checkout look like it belongs to
the site rather than to Shopify.

---

## 5. Layout

| Field | Value |
|---|---|
| Logo position | Left |
| Order summary position | Right (desktop), collapsed at the top (phone, Shopify's default) |
| Product images in the order summary | On |

---

## 6. Words that show up in checkout

Not branding settings, but they are the copy the customer reads at the moment
of paying, and they should sound like the rest of the site. All optional.

| Where | Default | Suggested |
|---|---|---|
| Shipping rate names (Settings → Shipping and delivery) | Whatever the carrier is called | "Ground, adult signature required" and "Two day, adult signature required". The signature note has to be visible before they pay. |
| Marketing opt-in label (Online Store → Themes → … → Edit default theme content → Checkout & system) | "Email me with news and offers" | "Send me the occasional recipe and a heads-up on new bottles." |
| Order status page, "Continue shopping" | The store | `https://denadatequila.com` (Settings → Checkout → Post-purchase) |

---

## 7. Check it

Reach checkout with a real add-to-cart on the draft theme preview, then walk
this list on a laptop and a phone. Every line should be true.

- [ ] Wordmark in the header, sharp on a phone, links back to the store
- [ ] Cream page, off-white form column, no white anywhere except inside fields
- [ ] Section headings ("Contact", "Delivery", "Payment") are Oswald, uppercase, green
- [ ] The Pay button is green with cream text and square corners
- [ ] Field borders are grey, the focused field turns green
- [ ] The selected shipping method has a green ring and a cream background
- [ ] Nothing has rounded corners
- [ ] The browser tab shows the butterfly
- [ ] The order status (thank-you) page picks up the same branding
- [ ] Shop Pay, Google Pay and PayPal keep their own colours. That is expected and cannot be changed.

Once it is right, press **Publish** in the editor. The checkout branding is
independent of which theme is live, so it stays put when the theme changes on
launch day.
