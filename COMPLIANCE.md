# Legal and accessibility review (Nov 24, 2026)

A practical pass over denadatequila.com and shop.denadatequila.com for the
claims that most often turn into demand letters or lawsuits for a small
spirits brand. Not legal advice; items marked **Counsel** need a lawyer's eye.

## Fonts

| Where | Fonts | Status |
|---|---|---|
| Website | Oswald, EB Garamond, Libre Franklin, Caveat (self-hosted in `fonts/`) | SIL Open Font License 1.1: free for commercial web use. Licence text and copyright lines in `fonts/OFL.txt`. **OK** |
| Store theme | Dawn's Shopify-hosted fonts, set to match the website | Licensed through Shopify. **OK** |
| Store, legacy | `custom-fonts` snippet loaded Alata from another store's CDN | Alata is OFL, so not a licence problem, but it was hotlinked and unused. No longer rendered (theme commit Nov 24). |
| Store Files, legacy | 10 font files from the 2024 site: Trade Gothic LT Std (x2, Linotype/Monotype, commercial), Broth/BrothReg/BrothRegAlt/BrothBol (x6), simpletype (x2) | Deleted from Shopify Files on Nov 24 with Adam's go-ahead. None was used by any page; all were publicly downloadable. No font files remain in Files. |

## Accessibility (ADA Title III, WCAG 2.2 AA)

Tested with axe-core 4.10 on all 22 pages at desktop and phone width, plus
keyboard testing of the age gate, signup pop-up and navigation.

Fixed on Nov 24:
- Contrast: gold on green, gold on cream, cream on orange, faded cream on
  green, and the paloma/garden/sunrise eyebrows now meet 4.5:1 (3:1 for large
  text). Only remaining axe hit is the homepage hero button while it fades in;
  at rest it is 4.9:1.
- Age gate: focus starts on "Yes, I'm 21+", Tab stays inside, the page behind
  is inert, focus returns to the top of the page afterwards (`js/agegate-a11y.js`).
- Signup pop-up: Tab stays inside (Escape and focus return already worked).
- "Skip to content" link and a main landmark on every page.
- Homepage ticker: pause button (WCAG 2.2.2); still stops entirely under
  reduced motion.
- Footer links: 24px touch targets.
- Accessibility statement at `accessibility.html`, linked from every footer.
- Store: cart count badge now black on orange (was 3.1:1). Published Nov 24.

Keep doing: alt text on every new image, check new colours against
`#F3F8E4` / `#017A5F` / `#D37240` / `#231F20` before shipping, captions on
any video with speech.

## Alcohol advertising (TTB, 27 CFR part 5 subpart H)

- Responsible advertiser: footers read "De Nada Tequila, a brand of DNA
  Spirits, LLC, Stony Point, NY". Adam confirmed DNA Spirits, LLC (Nov 24).
- Class and alcohol content ("Tequila", 40% ALC/VOL) appear on the shop and
  product pages.
- Age gate on every page, 21+ on every footer, "Please drink responsibly".
- No health or therapeutic claims found. "Gluten free" for agave spirits is
  allowed under TTB Ruling 2014-2.

## Product claims (FTC Act, state consumer-protection laws)

- **"Carbon Neutral"** (homepage ticker, shop trust bar, FAQ, facts page):
  California's Voluntary Carbon Market Disclosures Act (AB 1305, Health &
  Safety Code 44475 et seq.) requires anyone making a carbon-neutral claim in
  California to publish on their website how the claim is verified and which
  offsets back it (project, registry, standard). Penalties run up to $2,500 a
  day. The FTC Green Guides also require substantiation. **Adam is sending
  the offset provider, project and registry (Nov 24); then build the
  disclosure page and link it wherever the claim appears.**
- **"Additive-free"** and **"Kosher certified"**: substantiation on file with
  Adam (confirmed Nov 24).
- **"All natural"**: removed from the gifting and recipes pages and the Trio's
  Shopify description; "natural" claims on food and drink are a common
  class-action target.
- **Trio pricing**: the $184.97 compare-at price is the three bottles' real
  everyday prices added together, which is a fair reference price. The
  Shopify page's "SALE" badge implies a temporary discount; fine while true.
- Bevstack's Trio copy says "three bottles ship free"; Adam to keep that true
  at checkout.

## Privacy

- Privacy policy covers cookies, the Meta pixel, Google Analytics, state
  privacy rights and opt-out. It promised to honour Global Privacy Control;
  the site now does (no Meta pixel, no Google ad personalisation for GPC
  visitors).
- CCPA/CPRA applies above $25M-plus revenue or 100,000 California consumers;
  De Nada is likely under both today, but the policy is already written as if
  it applied, which is the safer posture.
- `privacy.html` and `terms.html` rewritten as final documents, effective Nov
  24, 2026, draft disclaimer removed. Privacy: CCPA notice at collection
  (categories, sources, purposes, recipients by name), sale/sharing and GPC,
  Do Not Track statement, rights for every state with a privacy law, 10-day
  acknowledgment and 45-day response, appeals with the attorney general
  route, retention periods by category. Terms: Bevstack as seller of record,
  sign-in-wrap acceptance through the age check, compare-at price
  definition, social content used only with permission (New York Civil
  Rights Law 50-51), liability carve-outs, and an arbitration clause with
  60-day informal resolution, consumer fee coverage, mass-arbitration
  batching, public-injunction severance, and a 30-day opt-out.
- "Your Privacy Choices" link in every footer (to `privacy.html#choices`).
- Shopify's own policy pages (linked from the cart and checkout) still carry
  the old template text, including a "[BRAND URL]" placeholder in the Terms
  and a refund policy that asks for damaged items back. Replacement texts are
  in `SHOPIFY-POLICIES.md`; Adam pastes them in Settings, Policies (the
  Shopify connection lacks the policy permission).
- **What the policy commits us to:** acknowledge privacy requests within 10
  business days, answer within 45; honour "Do Not Sell or Share" emails;
  record any "Arbitration Opt-Out" emails.
- Email (CAN-SPAM): every marketing email needs the postal address and a
  working unsubscribe. Klaviyo's footer handles both; recheck once the
  Klaviyo connector is signed in again.

## Copyright and trademarks

- Press page uses outlet names in text and our own summaries, no copied
  articles or outlet logos. Award medal artwork is the organisers' winner
  artwork, used as intended.
- Photography: keep Tyler Rizzuto's licence or work-for-hire agreement on
  file covering web, email, ads and the press kit.
