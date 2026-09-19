# Launch checklist — October 1st, 2026

Everything in order. Owner in brackets. Items marked **[Claude]** happen when
you say "go" in the session — none of them run on their own.

---

## By September 29th — must be done before launch day

| # | Item | Owner | How to check |
|---|---|---|---|
| 1 | **Pre-order inventory** — on each of the three glass products (Blanco 700ml, Reposado 700ml, Añejo 700ml): Inventory → tick *Continue selling when out of stock* | you | Add a glass bottle to cart on shop.denadatequila.com and reach checkout without "Sold out" |
| 2 | **Shopify theme published** — the GitHub-connected theme is the live theme | you | Themes page shows *denadatequila-shopify-theme/main* as current |
| 3 | **Checkout branding** — Settings → Checkout → Customize → Branding (colours, logo, fonts, square corners) | you | Reach checkout; it's cream/green, not white/blue |
| 4 | **Email templates** — Settings → Notifications → Customize email templates → wordmark + `#018769` | you | Send a test order confirmation to yourself |
| 5 | **Klaviyo flows built** — Welcome 1 live; Welcome 2 & 3 built and in *Draft*; Pre-order, Abandoned checkout, Post-purchase live | you | Flows page |
| 6 | **Launch campaign drafted** in Klaviyo (copy in `email/KLAVIYO.md`), scheduled Oct 1, 9:00 am ET, to Guest List | you | Campaigns page shows it scheduled |
| 7 | **Klaviyo sending domain verified** — Settings → Domains → `send.denadatequila.com` shows verified | you | Green check in Klaviyo |
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
| 5 | **Test a pre-order end to end** — from `denadatequila.com/shop.html` → Blanco → Pre-Order → Shopify cart → checkout. Use a 100%-off discount code to complete it, then cancel/refund the order | you | 5 min |
| 6 | Check `shop-preflight.html` on the live domain — five green pills, three *pre-order* pills | you | 1 min |
| 7 | **Klaviyo** → Welcome 2 and 3 → **Live** | you | 1 min |
| 8 | **Launch campaign** — confirm it's scheduled (or send it now if the time has passed) | you | 1 min |
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
| 3 | Shopify → any pre-orders? Pre-order flow email 1 went out? | you |
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
| Shop config | `js/shop-config.js` — variant IDs, prices, `preorder` fields (blank them when bottles ship) |
| Pre-flight | `denadatequila.com/shop-preflight.html` |
