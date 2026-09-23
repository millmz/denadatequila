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
| 5 | ~~Klaviyo flows built~~ **Rebuilt Sept 22 after the email audit.** Welcome (3), Abandoned checkout (2), Post-purchase (4, on delivery, handles two- and three-bottle orders), Win-back and the Behind the Bar recipe series (26 emails, one every two weeks) are built and **in Draft** until launch day. One flow is **live now**: the pre-launch confirmation ("You're on the list."), which goes off on launch morning. IDs in `email/KLAVIYO.md` | — | Flows page |
| 5a | ~~Klaviyo organization address~~ **Done.** 148 South Liberty Drive, Stony Point, NY prints in every footer | — | Send yourself a preview of Welcome 1; footer shows the address |
| 5b | ~~Klaviyo default sender~~ **Done.** `orders@denadatequila.com`, De Nada Tequila | — | Field is filled |
| 6 | ~~Launch campaign drafted~~ **Done, plus five more.** "Launch — It's here. (Oct 1)" is a draft with send time pre-set to Oct 1, 9:00 am ET, to the list minus the legacy import. Also drafted with pre-set times: "Legacy hello — We moved" (Oct 2, old-list subscribers only), "Launch resend" (Oct 4, non-openers only), "Gifts" (Nov 5), "Thanksgiving" (Nov 12), "Holidays — order by Dec 15" (Dec 10). **Do not press Schedule on any of them until launch-day step 2 passes** | you (on the day) | Campaigns page |
| 7 | ~~Klaviyo sending domain verified~~ **Done Sept 23.** `hello.denadatequila.com` is verified and active; every email sends from it now | — | Settings → Domains shows Active |
| 8 | ~~Old subscriber list imported~~ **Done Sept 18.** The Squarespace list (about 385 people) and the old store's customers came in with the Shopify connection. On Sept 23 all 452 of them were tagged `signup_source` = `legacy` in Klaviyo, and the *Legacy subscribers* segment keys off that tag. Signups from the teaser form are the only ones outside it | — | Segment *Legacy subscribers* shows roughly 450; the launch campaign's recipient estimate is small |
| 9 | ~~Old-site URL list~~ **Done Sept 23.** The old Squarespace URLs Google still indexes (shop, cocktails, our story, FAQ, locations, terms, privacy, the per-drink recipe pages, plus the usual cart, contact and blog paths) redirect permanently to the matching new pages the moment `main` goes live. Any 404s Search Console reports after launch get added the same way | — | `_redirects` on `main` has the entries |
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
| 7 | **Klaviyo flows**: Pre-launch confirmation → **Draft** (off). Then Welcome, Abandoned checkout, Post-purchase, Win-back, Behind the Bar → **Live**. Say "go" and Claude does all six, or do it in Flows | you / [Claude] | 1 min |
| 7a | **Klaviyo → Flows → Behind the Bar → ⋯ → Back-populate** → segment *Email subscribers (all)*. Puts everyone already on the list into the recipe series; the API can't do this part | you | 1 min |
| 8 | **Launch campaign** → open "Launch — It's here. (Oct 1)" → Review → **Schedule** (time is pre-set; if 9 am has passed, send now). Then "Legacy hello — We moved" → **Schedule** (pre-set for Oct 2, 10 am ET) | you | 2 min |
| 8a | **Oct 2 or 3:** "Launch resend — In case you missed it" → Review → **Schedule** (pre-set Oct 4, 10 am ET). It excludes everyone who has opened the launch email, so wait until the opens have come in | you | 1 min |
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

## Added September 22 (site audit fixes)

| # | Item | Owner | How to check |
|---|---|---|---|
| 13 | **Shipping page facts.** `shipping.html` now follows sections 4 to 7 of the Terms (all sales final, 3 days to report damage with photos, refund or replacement to the original payment method, returned orders refunded less shipping and restocking, BEVSTACK-WINE/LIQR on the statement). Two things it says that are not in the Terms: orders leave in 1 to 2 business days and arrive in 2 to 5. Confirm those with the retailer. Then paste the two policies in `SHOPIFY-POLICIES.md` into Shopify → Settings → Policies and fix the three loose ends listed there (blank restocking fee, "a certain amount of days", the contradictory Refunds and Exchanges section) | you | `shipping.html` and the Shopify policies read the same |
| 14 | **GA4 cross-domain.** The site tag now links `shop.denadatequila.com`. In GA4: Admin → Data streams → the web stream → Configure tag settings → Configure your domains → add both `denadatequila.com` and `shop.denadatequila.com`. Then make sure the same GA4 stream is installed on Shopify (Google & YouTube channel, or Customer events) | you | Realtime report shows one session from site into checkout |

## Added September 22 (email audit build)

| # | Item | Owner | How to check |
|---|---|---|---|
| 15 | **The pre-launch confirmation is sending now.** Anyone who signs up on the teaser gets "You're on the list." fifteen minutes later. One catch: an address that is already on the list (yours came in with the Sept 18 import) is updated, not re-added, so it gets no confirmation. Test with an address that is not on the list, or have Claude remove yours from the list first | you | Sign up on the teaser with a fresh address; the email arrives within twenty minutes with the street address in the footer |
| 16 | **Klaviyo onsite tracking on the Shopify theme (optional).** The added-to-cart flow was cut on Sept 22 (one nudge too many; the two abandoned checkout emails cover it), so nothing sends off this. Klaviyo → Integrations → Shopify → Onsite tracking on, whenever there is time; it records *Viewed Product* for segments and analytics | you | A *Viewed Product* event shows on your Klaviyo profile after you open a product page on the store |
| 17 | **Delivered Shipment check.** The post-purchase flow starts when the carrier marks the box delivered. After the launch-day test order ships, look for a *Delivered Shipment* event on your profile in Klaviyo. If it never appears, tell Claude: the trigger switches to *Fulfilled Order* with a 6-day first delay | you → Claude | Event appears within a day of delivery |
| 18 | **Holiday order-by dates.** The Nov 12 email says "order by Monday, November 16" and the Dec 10 email says "order by Tuesday, December 15". Confirm both with the retailer (their cut-off, plus 2 to 5 days transit and the signature attempt) before scheduling those campaigns. Claude can change the dates in a minute | you | Retailer confirms in writing |
| 19 | **Gift notes (optional).** The gift emails do not promise a note in the box. If the retailer will print order notes, turn on the cart note in the Shopify theme and tell Claude; one sentence gets added to the Nov 5 and Dec 10 emails | you | A test order's note appears on the retailer's packing slip |
| 20 | **Signup card on the site.** `js/signup-modal.js` shows the Guest List card once per visitor per 30 days on the main pages, after the age gate. It never shows on the QR welcome page or to people arriving from an email. If it feels like too much, remove the one script tag; nothing else depends on it | you | Open the site in a private window, wait 25 seconds or move the mouse to the tab bar |
