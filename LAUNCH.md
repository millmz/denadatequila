# Launch checklist — October 1st, 2026

Everything in order. Owner in brackets. Items marked **[Claude]** happen when
you say "go" in the session — none of them run on their own.

---

## By September 29th — must be done before launch day

| # | Item | Owner | How to check |
|---|---|---|---|
| 1 | **Glass products stay Draft in Shopify until launch morning.** No pre-orders. Rename the two aluminum products to *Travel Bottle Blanco* and *Travel Bottle Reposado* (titles only; handles and variant IDs stay). Keep "Blanco", "Reposado" and "Añejo" in every product title: the post-purchase emails key off those words | you | Products page |
| 2 | **Shopify theme published** — the GitHub-connected theme is the live theme | you | Themes page shows *denadatequila-shopify-theme/main* as current |
| 3 | **Checkout branding** — Settings → Checkout → Customize → Branding (colours, logo, fonts, square corners) | you | Reach checkout; it's cream/green, not white/blue |
| 4 | **Email templates** — Settings → Notifications → Customize email templates → wordmark + `#018769` | you | Send a test order confirmation to yourself |
| 5 | ~~Klaviyo flows built~~ **Done (Sept 19).** Welcome, Abandoned checkout, Post-purchase and Win-back are built and **all in Draft** until launch day. Nothing sends before Oct 1. IDs in `email/KLAVIYO.md` | — | Flows page |
| 5a | **Klaviyo organization address** — Settings → Organization → street address. Every email footer prints it; it is blank right now, and CAN-SPAM requires it | you | Send yourself a preview of Welcome 1; footer shows the address |
| 5b | **Klaviyo default sender** — Settings → Organization → default sender email `orders@denadatequila.com` | you | Field is filled |
| 6 | ~~Launch campaign drafted~~ **Done.** Campaign "Launch — It's here. (Oct 1)" is a draft with send time pre-set to Oct 1, 9:00 am ET. **Do not press Schedule until launch-day step 2 passes** — its button goes to `denadatequila.com/shop.html` | you (on the day) | Campaigns page |
| 7 | **Klaviyo sending domain verified** — Settings → Domains → add `send.denadatequila.com`, add the CNAMEs at Squarespace, verify. None exists yet | you | Green check in Klaviyo |
| 8 | **Old subscriber list imported** — Squarespace export → Klaviyo, tagged `legacy` | you | Member count |
| 9 | **Old-site URL list** sent to Claude for redirects — or accept that old links 404 after launch | you → Claude | `_redirects` on `main` has the entries |
| 10 | **Netlify Forms limit** — Forms → check current month's count; if near 100, upgrade or rely on Klaviyo | you | Forms page |
| 11 | **Shopify theme preview screenshots** sent to Claude; any fixes pushed | you → Claude | Nothing looks off in the preview |
| 12 | **Instagram bio link** ready to change to `denadatequila.com` on the day | you | — |

---

## Launch day — in this order (about 20 minutes)

Pick a quiet morning. Everything below is reversible.

| # | Step | Owner | Time |
|---|---|---|---|
| 1 | **Netlify** → Site configuration → Build & deploy → Build settings → **Production branch: `teaser` → `main`** → Save → Deploys → **Trigger deploy** | you | 2 min |
| 2 | Wait for the deploy to say *Published*. Private window → `https://www.denadatequila.com` → the full site, age gate, padlock | you | 3 min |
| 3 | **Revert commit `b7df300`** in the theme repo — restores every store link to the website and switches menus to `website-menu`. Shopify pulls it into the live theme automatically | **[Claude]** — say "go" | 1 min |
| 4 | Verify on shop.denadatequila.com: header logo → website; menu items → website pages; add to cart → *Continue shopping* → `denadatequila.com/shop.html` | you | 2 min |
| 4a | **Shopify** → the three glass products → status **Active** | you | 1 min |
| 5 | **Test an order end to end** — from `denadatequila.com/shop.html` → Blanco → Add to Cart → Shopify cart → checkout. Use a 100%-off discount code to complete it, then cancel/refund the order | you | 5 min |
| 6 | Check `shop-preflight.html` on the live domain — five green pills, no *pre-order* pills | you | 1 min |
| 7 | **Klaviyo flows → Live**: Welcome (all three emails), Abandoned checkout, Post-purchase, Win-back. Say "go" and Claude flips all four, or do it in Flows | you / [Claude] | 1 min |
| 8 | **Launch campaign** → open "Launch — It's here. (Oct 1)" → Review → **Schedule** (time is pre-set; if 9 am has passed, send now) | you | 1 min |
| 9 | **Instagram** bio link → `denadatequila.com`; post the launch | you | — |
| 10 | Check QR: `denadatequila.com/w/b` → welcome page with Blanco highlighted | you | 1 min |

### Rollback, if anything is wrong at step 2 or 4
- Site: Netlify → Production branch back to `teaser` → Trigger deploy. Seconds.
- Store: Themes → publish the previous theme. Seconds.
Nothing else needs undoing; DNS never changes.

---

## Day after

| # | Item | Owner |
|---|---|---|
| 1 | Google Search Console → check for 404s on old URLs; send Claude any that matter | you → Claude |
| 2 | Klaviyo → Welcome 1 open rate; launch campaign delivered count | you |
| 3 | Shopify → any orders? Klaviyo → Abandoned checkout flow has entries? | you |
| 4 | Delete the `teaser` branch deploy setting in Netlify (optional tidy-up) | you |

---

## Contacts / where things are

| Thing | Where |
|---|---|
| Website code | github.com/millmz/denadatequila — `main` |
| Teaser | same repo, `teaser` branch |
| Shopify theme | github.com/millmz/denadatequila-shopify-theme — `main`; pre-launch commit to revert: `b7df300` |
| Netlify site | storied-cassata-208f7d |
| DNS | Squarespace (nameservers moved from Cloudflare, Sept 2026) |
| Email | Klaviyo — list `WXrq3N`; copy in `email/KLAVIYO.md` |
| Shop config | `js/shop-config.js` — variant IDs, prices. `preorder` fields are blank and stay blank |
| Pre-flight | `denadatequila.com/shop-preflight.html` |
