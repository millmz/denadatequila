# Growth plan: reaching new subscribers and customers

Built Oct 23, 2026, after Adam asked how to 10x the online business. The
site, Klaviyo and Shopify pieces are in place; what each one still needs
from Adam is listed at the end. The weekly routine (`WEEKLY-LOG.md`) reports
on all of it.

## What was built

| Piece | Where | Status |
|---|---|---|
| Klaviyo onsite tracking and Viewed Product events | `js/klaviyo-track.js`, loaded on the eight main pages; product pages send Viewed Product to the API metric `Wv5C5B` | Live on main |
| Visitor identification after signup | `js/signup.js` stores the email and calls `klaviyo.identify` | Live on main |
| Browse abandonment flow | Klaviyo flow `USbWpx`, trigger Viewed Product (`Wv5C5B`), 4-hour delay, one email (master `WqXiTh`); skips anyone who ordered or started checkout since; one send per week per person | Live since Oct 23 |
| Cross-sell flow | Klaviyo flow `TPrmZA`, trigger Placed Order, 30-day delay, skips anyone who ordered again, one email (master `S8teUi`) that recommends the bottle they do not have; re-entry after 60 days | Live since Oct 23 |
| Recipe-series signup page | `recipes.html`, `signup_source` = `recipes` plus the ad's `utm_campaign`; GA4 `generate_lead`; Meta `Lead` on signup | Live on main |
| Meta pixel | `js/meta-pixel.js` on every main page, ID `3958712751050131` in `js/list-config.js` (added Oct 23): PageView everywhere, ViewContent on product pages, Lead from every signup form. Purchases come from Shopify's Meta channel, which Adam connects in Shopify admin | Live on main |
| Meta ad creatives and copy | Scratchpad `ads/` (six JPGs: Paloma, Margarita, Founders; `ADS.md`); build brief in `META-CAMPAIGN-BRIEF.md` | Revised Oct 24 around the Crown playbook (hosting frame, tagline); Adam publishes in Ads Manager; pixel is live |
| Corporate gifting page | `gifting.html`, Netlify form `gifting`, tiers (one bottle, The Trio $199, by the case), footer link on every page | Live on main |
| The Trio bundle | Shopify product `gid://shopify/Product/15500768837920`, SKU `DN-TRIO-700`, $199 | **Draft** in Shopify; photo to add in admin; retailer must confirm fulfilment |
| Outreach email | Scratchpad `gifting/outreach-email.md` | For Adam to send |
| Referral line in Behind the Bar | Each recipe email ends with a line linking to `recipes.html?utm_source=klaviyo&utm_medium=email&utm_campaign=btb-referral` | See `KLAVIYO.md`, Flow 5 |

## Meta reporting

`scripts/meta-insights.py` prints the last 7 days of spend, clicks, leads and
cost per lead per ad for the account. The token never lives in the repo or
the environment: a Network secret in the cloud environment (type Bearer, host
`graph.facebook.com`, header `Authorization`, prefix `Bearer `) adds it to
each request on the way out. The ad account id is `META_AD_ACCOUNT_ID` or
the `DEFAULT_ACCOUNT` constant in the script. Until both are set it exits
with a one-line notice and the Monday routine reports the Klaviyo-side
signups only (`signup_source` starting `recipes:recipes-leadgen`).

## UTM plan

One rule: `utm_source` is the channel, `utm_medium` is how, `utm_campaign`
is the effort, `utm_content` is the creative. Klaviyo copies `utm_campaign`
into `signup_source` as `page:campaign`, so the Monday report can count
signups per effort without GA.

| Source | Medium | Campaign | Content | Example |
|---|---|---|---|---|
| `meta` | `paid` | `recipes-leadgen` | `paloma`, `oldfashioned`, `founders` | the three ads |
| `klaviyo` | `email` | the send's slug (`anejo-oct22`, `browse-abandon`, `second-bottle`, `btb-referral`, `reengage-oct29`) | | every email button |
| `fleet` | `qr` | the trailer (`blanco-trailer` etc.) | | truck QR codes, already in place |
| `tasting` | `qr` | the venue slug (`whole-foods-ues`) | | QR on tasting-table cards, to `recipes.html` |
| `website` | `shop` | `dtc` | | the Buy buttons, already in place |
| `instagram` | `bio` | `profile` | | the link in the Instagram bio |

Cost per subscriber = ad spend for the week divided by signups whose
`signup_source` starts with `recipes:recipes-leadgen`.

## Ship-to states (from Shopify, Oct 23)

The three bottles sit on the retailer's shipping profile ("alch bevstack"),
which covers 34 states and DC: AZ, CA, CO, CT, DE, DC, FL, GA, ID, IL, IN,
IA, KS, KY, LA, MA, MN, MO, NV, NJ, NM, NY, NC, OH, OK, OR, PA, RI, TX, VT,
WA, WV, WI, WY. Use exactly this list for ad targeting. The store's
"General profile" lists every state and 25 countries, so any new product
(the Trio included) must be moved onto the retailer profile before it goes
Active, or checkout will accept addresses that cannot be shipped.

## Lift the basket

- **The Trio at $199.** Draft in Shopify. Once the retailer confirms, set it
  Active, add it to `js/shop-config.js` as a fourth product (`trio`), and a
  "Shop the Trio" card can go on `shop.html` and `gifting.html`.
- **Free shipping threshold.** Needs the retailer's shipping rates. The
  usual setting is free shipping just above the two-bottle mark (around
  $110), so a single bottle pays shipping and a second bottle does not. Set
  it in Shopify > Settings > Shipping once the rate card is known.

## Channels that need Adam, not code

- **Marketplaces: ReserveBar, Drizly via Uber, Instacart, Caskers, Flaviar.**
  Each listing is a free acquisition channel. ReserveBar and Caskers need a
  distributor relationship and a product submission; Drizly and Instacart
  list through the retailers that stock you, so every retail account is also
  a marketplace listing. First call is to the retailer who fulfils DTC.
- **Tastings.** Every pour is a signup if the table card carries a QR to
  `recipes.html?utm_source=tasting&utm_medium=qr&utm_campaign=<venue>`.
  Print a short stack of cards; I can make the QR and the card.
- **Wholesale.** Bars and shops drive brand search. Recipe cards with a QR
  at every account.
- **Press.** The Agavos Gold and the all-natural story; the press kit from
  launch is ready to re-send.

## Targets to hold ourselves to

| | Now (Oct 23) | 90 days | 12 months |
|---|---|---|---|
| Email list, real people | ~640 | 2,500 | 8,000 |
| Online orders a month | ~15 | 50 | 150 |
| Average order | ~$150 | $165 (Trio) | $170 |
| Repeat buyers | few | 15% of customers | 30% |

Ten times is the 12-month column. Ninety days gets a third of the way with
the lead-gen ads, the Trio and the holiday sends; marketplaces and corporate
gifting are the two levers that can jump the curve.
