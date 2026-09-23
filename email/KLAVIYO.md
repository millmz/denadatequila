# Klaviyo: flows, campaigns and setup

Copy for every automated email, in the brand voice, ready to paste. Plus the
one-time setup that makes them deliverable. Signups already land in the list
(`js/list-config.js`); this is what happens after.

**Voice, in one line:** a good host. Warm, direct, a little dry. Never "we're
so excited". Never an exclamation mark doing the work a sentence should.

**Three house rules, no exceptions:**
1. **No em dashes** anywhere in an email. Rewrite the sentence.
2. **No puns.** No "pour" jokes, no "raise a glass", no "cheers to". Say the
   plain thing. "Behind the Bar" is the name of the cocktail section on the
   site, so it may appear as a label; nothing else bar-themed.
3. **Warm, not clipped.** Dry is fine; cold is not. Every email should read
   like a note from a host who is glad you came, and the sign-off is always
   "De Nada," with a capital N.
4. **The emails sell the glass bottles.** The aluminum line is the Travel
   Bottle. It exists on the site and can be bought, but no email promotes it.
5. **Buttons.** Green (`#018769`) is always shop intent and always says
   "Shop now" or "Shop the Blanco / Reposado / Añejo", and it sits on the left.
   Orange (`#D37240`) is every other action: recipes, our story, tell us.
   Never "See the bottles", never "Get the".
6. **Nothing about the machinery.** No email says how often we write, when
   the next one comes, or when orders leave and arrive. The two holiday
   emails may give an order-by date. Nothing points at the unsubscribe link.
7. **Orders can hold two or three bottles.** Any copy keyed to the bottle
   bought must read right for Blanco + Añejo and for the full set.

**Every email footer (compliance):**
> De Nada Tequila · [physical mailing address] · Must be 21+ to receive these
> emails. Please drink responsibly. [Unsubscribe]

Klaviyo inserts the unsubscribe link and address from *Settings → Organization*;
fill the address in there once.

---

## Built in Klaviyo (rebuilt Sept 22, 2026 after the email audit)

Everything below exists in the account. Everything is **in Draft** except the
pre-launch confirmation, which is **live now** and gets turned off on launch
morning. Each flow email uses a *clone* of its master template, so to change
copy: edit the master, then re-select it on the flow email (Klaviyo clones it
again), or edit the flow's own copy directly.

| Thing | Klaviyo ID | Status | Trigger / rule |
|---|---|---|---|
| **Pre-launch confirmation** "You're on the list." | `RW2Gnc` | **Live now. Turn OFF on Oct 1** | Added to list `WXrq3N` → 15 min → one short email. Skips anyone in the *Legacy subscribers* segment, so the old-list import does not trigger it |
| Welcome flow | `UQqXn7` | Draft until Oct 1 | Added to list `WXrq3N`; every email skips anyone who has *Placed Order* |
| Welcome 1 "You're welcome." | action `117746850` | | immediately. Two paragraphs, the bottles, and the five easiest recipes with links |
| Welcome 2 "The house margarita" | action `117746852` | | +3 days. Tommy's Margarita |
| Welcome 3 "Nothing added." | action `117746854` | | +4 days. How it's made, then the shop |
| Abandoned checkout | `TDe5uV` | Draft until Oct 1 | *Checkout Started* → 1 h "Your cart is still here." → 23 h later "Still thinking?" (shipping, the signature, breakage, answered). Both skipped if they ordered since. Re-entry after 7 days |
| Post-purchase | `Ycdays` | Draft until Oct 1 | *Delivered Shipment* → next day 10 am "The first drink" → +28 d "How was it?" → +30 d "The other one" → +16 d "Running low?" (last two skipped if they re-ordered). Re-entry after 90 days. Copy keys off every bottle in the order, so two- and three-bottle orders read right |
| Win-back | `SwCgXT` | Draft until Oct 1 | joins segment *Unengaged 90* → "It's been a while." |
| Behind the Bar (recipe series) | `WWi5g9` | Draft until Oct 1 | joins segment *Email subscribers (all)* → 14 days → one recipe every 14 days, **26 emails**, about a year. 10 am local. Each profile goes through once |
| Segment: Email subscribers (all) | `S2hYpZ` | active | anyone subscribed to email marketing. Trigger for the recipe series |
| Segment: Legacy subscribers (old list import + old store) | `SwxJSs` | active | Subscribed by list import, or by the Shopify sync, or has `signup_source` = `legacy`. Covers the Squarespace list and the old store's customers without any tagging; teaser-form signups come in as "API" and stay out. Excluded from the launch email and the pre-launch confirmation; gets its own hello |
| Segment: Opened an email since Oct 1 | `VeuGeB` | active | *Opened Email* at least once after Oct 1. The launch resend excludes it, so only non-openers get the second send |
| Segment: Unengaged 90 (win-back) | `TXVT4s` | active | on list ≥ 90 days, no email open in 90 days, still subscribed |
| Segment: Unengaged 180 (sunset) | `QVtUiH` | active | on list ≥ 180 days, no open and no order in 180 days → **suppress these monthly** (Audience → segment → ⋯ → Suppress) |
| Campaign: Launch "It's here." | `01M2XKA0THK4TZ2PFTV4TVRD4Y` | Draft, send time pre-set Oct 1, 9:00 am ET | To the list, **minus** the legacy segment. Press *Schedule* on launch morning after the site is confirmed live |
| Campaign: Legacy hello "We moved." | `01M35J4YZKFKM6TX9JBTRENFGP` | Draft, pre-set Oct 2, 10:00 am ET | To the *Legacy subscribers* segment only. Schedule it on launch morning too |
| Campaign: Launch resend "In case you missed it" | `01M35J4TYP9MZAXKA0EQMDWWVV` | Draft, pre-set Oct 4, 10:00 am ET | Same launch email, new subject, to the list minus legacy **minus anyone who opened since Oct 1**. Schedule on Oct 2 or 3, once the opens have come in |
| Campaign: Gifts "The gift that gets opened." | `01M35J51EZ660MEHZDWJ8C2PRJ` | Draft, pre-set Thu Nov 5, 4:00 pm ET | Whole list |
| Campaign: Thanksgiving "What to bring on Thursday." | `01M35J54SJA1MTPZBQX80PRNSK` | Draft, pre-set Thu Nov 12, 4:00 pm ET | Whole list. Says "order by Monday, November 16": confirm that date with the retailer first |
| Campaign: Holidays "Order by December 15." | `01M35J57KR82T7H99SQ72G3YMH` | Draft, pre-set Thu Dec 10, 4:00 pm ET | Whole list. Confirm the Dec 15 cut-off with the retailer first |
| Master templates | Welcome 1 `WczNp9`, 2 `T44PbR` (the margarita, formerly Welcome 3), 3 `WLcyAA`, Pre-launch `VBYdMs`, Launch `TXzT3x`, Legacy hello `WEJNbp`, Abandoned 1 `UBcbGw`, Abandoned 2 `W7avPs`, Post-purchase `RkRs58` / `Redbzd` / `XJSEPZ` / `RYwczB`, Win-back `UK2Wh9`, Gifts `SkdJ3T`, Thanksgiving `SFjZtP`, Holidays `S6FX2C`, Behind the Bar 01–26 (IDs in Flow 5 below). The old "Three bottles. One rule." template `X44RVM` is unused | | Reuse for new campaigns: Content → Templates → clone |

**Hero images.** Served from `denadatequila.com/img/email/` (the files are on
`main` and on `teaser`, so previews work before launch). The rule: an email
about people or the brand gets one photo from the dinner shoot; an email that
carries a recipe gets the same cocktail render the site uses for that drink,
in a 340 px framed card under the wordmark; an email that is just a nudge gets
no image at all. Welcome 1 Adam opening the Blanco at the dinner table with
the Reposado and Añejo beside him (`uncork.jpg`; alternatives with all three
bottles in frame: `lineup-2.jpg`, `bar-table.jpg`, `bar-table-2.jpg`), Welcome
2 the Tommy's Margarita render,
Welcome 3 Danny and Adam in the kitchen, Launch the table toast (full width),
Legacy hello the three bottles on the counter mid-drink (`bar-table.jpg`),
Post-purchase 1 Danny pouring, Post-purchase 3 the photo of the bottle it
introduces (`blanco-table.jpg`, `reposado-table.jpg`, `danny-anejo.jpg`, or
`lineup-2.jpg` for the full set), Gifts the three bottles on the sunlit
sideboard (`lineup-2.jpg`), Thanksgiving the set
table, Holidays the toast, Win-back the De Nada Paloma render. The two Añejo
recipes use crops from the shoot (Adam with the rocks glass; Danny with the
Añejo) because there is no render for them yet. Abandoned checkout,
Post-purchase 2 and 4 and the pre-launch confirmation have no image.
Full photo index in `PHOTOS.md`.

**Launch morning, in Klaviyo (or say "go" and Claude does the first three):**
1. Flows → **Pre-launch confirmation → Draft** (off). Welcome 1 takes over.
2. Flows → set Welcome, Abandoned checkout, Post-purchase, Win-back and Behind the Bar to **Live**.
3. Campaigns → "Launch: It's here." → Review → **Schedule**. Then "Legacy hello" → **Schedule** (it is pre-set for the next morning).
4. Flows → Behind the Bar → ⋯ → **Back-populate** → everyone already in *Email subscribers (all)*. This is the one thing the API can't do; without it the existing subscribers never enter the series.
5. Oct 2 or 3: Campaigns → "Launch resend" → **Schedule**. It only goes to people who have not opened the launch email.

**Still needed from you (Settings → Organization):** street address (footer is
blank without it; legally required, and the pre-launch confirmation is
already sending) and default sender email `orders@denadatequila.com`. Then
Settings → Domains → branded sending domain.

**Product titles matter.** The post-purchase emails pick the recipe, the
cross-sell and the reorder button by looking for "Blanco", "Reposado" or
"ejo" in the Shopify product title. Keep those words in every title, glass and
Travel Bottle alike. If none of the three is found, the emails fall back to a
generic version (Tommy's Margarita, the Blanco cross-sell, a plain "Shop
now"). An order with two bottles gets both recipe cards, is introduced to the
bottle it is missing, and gets a plain "Shop now" reorder button; the full set
gets a suggestion for each bottle instead of a cross-sell.

---

## Flow 0: Pre-launch confirmation (live now, off on Oct 1)

**Trigger:** *Added to List* → the list, 15 minutes later. Skips the *Legacy
subscribers* segment. Smart sending off, so it always sends.

**Subject:** You're on the list.
**Preview:** October 1st. You'll be the first to know.

> **You're on the list.** Thank you. Genuinely.
>
> The new De Nada opens on October 1st: three glass bottles, a new site, and
> a cocktail book we've been working on for a while. You'll be the first to
> know.
>
> Until then, if you have a question, just reply. It comes straight to us.
>
> De Nada,
> Danny & Adam

---

## Flow 1: Welcome

**Trigger:** *Added to List* → the list.
**Filter:** has not *Placed Order* (customers get the post-purchase flow instead).

### Email 1, immediately

**Subject:** You're welcome.
**Preview:** That's what De Nada means. It's also the whole idea.

> *(photo: Adam opening the Blanco at the table, Reposado and Añejo beside him)*
>
> **You're welcome.** Not the polite reflex. The real thing.
>
> Thanks for signing up. We're Danny and Adam, and this is the tequila we make
> at NOM 1414 in the highlands of Jalisco: estate-grown agave, nothing added,
> three glass bottles. **Blanco** for the drinks, **Reposado** for the end of
> the day, **Añejo** for sipping.
>
> Here are the five drinks we make most. They're the easy ones, and every one
> links to the full recipe.
>
> **The easy five**
> Tommy's Margarita · Blanco, lime, agave
> De Nada Paloma · Blanco, grapefruit, lime, soda
> Garden Party · Blanco, lime, cilantro, a slice of jalapeño
> Tequila Sunrise · Blanco, orange, lime, a cherry
> Mexican Style Old Fashioned · Reposado, mezcal, agave, bitters
>
> Make one this week. And if you ever have a question, just reply. It comes
> straight to us.
>
> [ **Shop now** → shop.html ] [ **All the recipes** → cocktails.html ]
>
> De Nada,
> Danny & Adam

The site's signup card (`js/signup-modal.js`) promises these five recipes, so
this email is what delivers them. Keep the list in both places the same.

### Email 2, day 3

**Subject:** The house margarita
**Preview:** Three ingredients. You probably have two of them.

> *(photo: the Tommy's Margarita render)*
>
> This is the one we make when people come over, and it's the reason the
> Blanco exists. We'd love for it to become your house drink too.
>
> **Tommy's Margarita**
> 2 oz De Nada Blanco
> 1 oz fresh lime juice
> ½ oz agave nectar
>
> Shake hard with plenty of ice, fifteen seconds. Strain over fresh ice. Lime
> wedge. Salt if you want it; we usually don't.
>
> That's it. If you'd like the other twenty-six, they're on the site, and
> every one of them tells you which bottle it wants. Make one this weekend and
> let us know how it goes.
>
> [ **Shop the Blanco** → product-blanco.html ] [ **Behind the Bar** → cocktails.html ]
>
> De Nada,
> Danny & Adam

### Email 3, day 7

**Subject:** Nothing added.
**Preview:** What's in the bottle, and what isn't.

> *(photo: Danny and Adam in the kitchen)*
>
> **Nothing added.** Which is harder than it sounds.
>
> You've had a recipe or two from us now, so here's what's actually in the
> glass.
>
> De Nada is made at NOM 1414, a family distillery in Arandas, in the
> highlands of Jalisco. Estate-grown agave, cooked slow in stone and brick
> ovens, fermented in open-air tanks with champagne yeast, and twice distilled
> in copper. There's classical music in the fermentation room, because that's
> the kind of place it is.
>
> Nothing is added at any point. No color, no sweetener, no glycerin. The
> **Blanco** is the spirit as it comes off the still. The **Reposado** rests
> four months in ex-bourbon American oak. The **Añejo** rests more than a
> year. Each of them has picked up a medal at the Agavos Awards, which we'll
> mention once and then try to stop mentioning.
>
> [ **Shop now** → shop.html ] [ **Our story** → our-story.html ]
>
> De Nada,
> Danny & Adam

---

## Campaigns: launch week

### Oct 1, 9 am ET: "It's here." (the list, minus legacy)

**Subject:** It's here.
**Preview:** New bottles. New home.

> *(photo: the table toast, full width)*
>
> **It's here.** New bottles. New home.
>
> The new De Nada is open, and we wanted you to be the first to see it. Three
> glass bottles: Blanco, Reposado and our first Añejo. And a site that's less
> about the tequila than about what you do with it and who you share it with.
>
> Come in and have a look around. And thank you for waiting with us. It means
> a lot.
>
> [ **Shop now** → shop.html ]
>
> De Nada,
> Danny & Adam

### Oct 2, 10 am ET: "We moved." (legacy segment only)

**Subject:** We moved. Here's the new De Nada.
**Preview:** Three glass bottles, a new site, and a cocktail book.

> *(photo: the three bottles on the counter, mid-drink)*
>
> **We moved.** Same tequila. New bottles. New home.
>
> You signed up for De Nada a while ago, on the old site, and we owe you a
> proper hello from the new one. We're Danny and Adam, and we've been busy.
>
> There are three glass bottles now: **Blanco**, **Reposado** and our first
> **Añejo**. A new site built around what you do with them. And a cocktail
> book with twenty-six recipes, every one of which tells you which bottle it
> wants.
>
> Come in and have a look around. We think you'll like what we've done with
> the place.
>
> [ **Shop now** → shop.html ] [ **The recipes** → cocktails.html ]
>
> De Nada,
> Danny & Adam

### Oct 4, 10 am ET: the resend (non-openers only)

Same email as Oct 1. **Subject:** In case you missed it: the new bottles.
**Preview:** Blanco, Reposado and a first Añejo. Open since Thursday.

---

## Flow 2: Abandoned checkout

**Trigger:** *Checkout Started*. Both emails skipped if they *Placed Order*
since. No discount; it trains people to abandon.

### Email 1, 1 hour later

**Subject:** Your cart is still here.
**Preview:** We kept it for you. No rush.

> **Still here.** We kept it for you. No rush.
>
> Hi. You were a click away from the {{ item names, "the Blanco and the
> Añejo" }}, so we saved it in your cart for whenever you're ready.
>
> If a question got in the way, about shipping or anything else, just reply
> to this email. One of us will get back to you personally.
>
> [ **Back to checkout** → {{ checkout URL }} ]
>
> De Nada,
> Danny & Adam

### Email 2, 24 hours after the checkout

**Subject:** Still thinking?
**Preview:** Shipping, the signature, and what happens if a bottle breaks.

> **Still thinking?** Fair. Here's what usually gets asked.
>
> Hi again. Your cart, with the {{ item names }} in it, is still saved. In case
> a question got in the way, here are the three we hear most.
>
> **Where do you ship?** A licensed retailer ships to most states, straight
> to your door.
>
> **Who needs to be home?** Someone 21 or over has to sign for the box, so
> send it where an adult will be, at home or at work.
>
> **What if it arrives broken?** Reply with a photo within three days and we
> replace it or refund it. That's the whole process.
>
> The rest is on our shipping and returns page. Anything else, reply to this
> email and one of us will answer personally.
>
> [ **Back to checkout** → {{ checkout URL }} ]
>
> De Nada,
> Danny & Adam

---

## Flow 3: Post-purchase

**Trigger:** *Delivered Shipment* (the carrier marked the box delivered), so
the first email lands when the bottle is actually on the counter. Shopify's
own confirmation and shipping emails go out first; these add what they can't
say. If a test order never produces a *Delivered Shipment* event in Klaviyo
(the retailer's tracking may not report it), switch the trigger to *Fulfilled
Order* and make the first delay 6 days.

| When | Subject | The one thing it does |
|---|---|---|
| Delivered + 1 day, 10 am | The first drink | The recipe for each bottle in the order, nothing else |
| + 28 days | How was it? | One question, reply by email, nothing else |
| + 30 days | The other one | Four versions, each with the photo of the bottle it introduces: no Blanco in the order (Reposado, Añejo, or both) → the Blanco; Blanco (alone or with the Añejo) → the Reposado; Blanco + Reposado → the Añejo; all three → "The full set", a suggestion for each bottle, button to the recipes. Skipped if they re-ordered |
| + 16 days (about 75 after delivery) | Running low? | One bottle bought → "Shop the <bottle>"; two or three → "Shop now". Skipped if they re-ordered |

### Email 1: The first drink

**Preview:** One recipe. The right one.

> *(photo: Danny pouring)*
>
> The bottle should be on your counter by now. Thank you, truly, for bringing
> it home. Here's what we'd make first.
>
> *(One card per bottle in the order. Blanco + Añejo shows both:)*
>
> **Blanco: Tommy's Margarita.** 2 oz Blanco, 1 oz lime, ½ oz agave. Shake hard, strain over fresh ice. Lime wedge.
> **Reposado: Mexican Style Old Fashioned.** 2 oz Reposado, ¼ oz mezcal, ¼ oz agave, 4 dashes Mexican chocolate bitters. Stir over ice, one large cube, orange peel.
> **Añejo: Neat, or an Old Fashioned.** Neat: one large cube if you like, and a minute before the first sip. Old Fashioned: 2 oz Añejo, a barspoon of agave, 2 dashes Angostura, 1 dash orange bitters. Stir, big cube, orange peel.
> *(No bottle recognised: Tommy's Margarita, "it works with any of the three".)*
>
> Then invite someone over. That's the part we care about most, and we hope
> it's a good night.
>
> [ **More recipes** → cocktails.html ]
>
> De Nada,
> Danny & Adam

### Email 2: How was it?

**Preview:** We'd genuinely like to know.

> Now that the bottle has had some time on your counter, we'd love to hear
> how it went. What you made with it, who you shared it with, whether it
> earned its spot.
>
> Just hit reply. One line is plenty, and it comes straight to Danny and Adam,
> not a form. Thank you for being one of the first.
>
> [ **Tell us** → mailto:orders@denadatequila.com ]
>
> De Nada,
> Danny & Adam

### Email 3: The other one

**Preview:** The one you haven't met yet.

Four versions in one template, keyed off every bottle in the order. Each
carries the photo of the bottle it introduces, and the headline is "The other
one." / "The one you haven't met yet." except for the full set.

> *(No Blanco in the order, so Reposado, Añejo or both. Photo: the Blanco on
> the table.)* You have the aged side of the range covered, so here is the
> one that makes the drinks. The **Blanco** is bright and agave-forward,
> vanilla and lime. The house margarita starts here, and so does most of the
> cocktail book. [ **Shop the Blanco** ]
>
> *(Blanco, alone or with the Añejo. Photo: the Reposado on the table.)* The
> Blanco is where the drinks start. The **Reposado** is where the evening
> goes: four months in ex-bourbon oak, vanilla and caramel, a smoky finish.
> Gold at the Agavos Awards, and the bottle for an Old Fashioned.
> [ **Shop the Reposado** ]
>
> *(Blanco and Reposado. Photo: Danny with the Añejo.)* You have the Blanco
> and the Reposado, so there is one left to meet. The **Añejo** is our first:
> a year and more in oak, chocolate and spice, a delicate finish. Sip it neat
> when the evening slows down. [ **Shop the Añejo** ]
>
> Each of the three ends: No pressure at all. We just had a feeling you'd like
> it, and we'd rather you hear about it from us.
>
> *(All three. Headline "The full set." / "Which one to open for what."
> Photo: the three bottles on the sideboard.)* You have all three, which we
> appreciate more than we can say. So instead of a bottle, a suggestion for
> each: the **Blanco** in a Paloma when people arrive, the **Reposado** in a
> Mexican Style Old Fashioned when they stay, and the **Añejo** neat, after
> dinner, for whoever is still at the table. Every recipe in the book tells
> you which bottle it wants, so the rest is up to you.
> [ **The recipes** → cocktails.html, orange ]
>
> De Nada,
> Danny & Adam

### Email 4: Running low?

**Preview:** Same bottle, on its way in a couple of clicks.

> **Running low?** It happens to the best of us.
>
> A couple of months in, a bottle in our house starts looking worryingly
> light. If yours is the same, here's the quickest way to fix it.
>
> And if it's still going strong, ignore this entirely. We'd rather you drink
> it slowly, with people you like.
>
> [ **Shop the Blanco / Reposado / Añejo** → that product page when they bought one bottle; **Shop now** → shop.html when they bought two or three ]
>
> De Nada,
> Danny & Adam

---

## Flow 4: Win-back

**Trigger:** joins *Unengaged 90* (on the list 90 days, no email opened in 90
days). One email.

**Subject:** It's been a while.
**Preview:** A recipe, and a hello.

> Hi again. We've been quiet in your inbox, or maybe you've been quiet with
> ours, and either way there are no hard feelings. Here's the drink we've been
> making most lately, in case it's useful this weekend.
>
> **De Nada Paloma**
> 2 oz De Nada Blanco · 2 oz fresh grapefruit juice · ½ oz fresh lime ·
> ¼ oz agave nectar · club soda to top. Shake everything but the soda. Strain
> over ice, top with soda. Grapefruit wedge.
>
> [ **Shop the Blanco** → product-blanco.html ] [ **Behind the Bar** → cocktails.html ]
>
> De Nada,
> Danny & Adam

Then a **sunset**: anyone still unengaged at 180 days → suppress. Unengaged
addresses drag every other email into spam.

---

## Flow 5: Behind the Bar (evergreen recipe series)

The email that keeps going after the welcome week. Flow `WWi5g9`.

**Trigger:** joins segment *Email subscribers (all)* `S2hYpZ`, which is every
profile subscribed to email marketing, so form signups, the legacy import and
Shopify customers all get it. Each profile goes through once. **Timing:** 14
days after joining (a week after Welcome 3), then one email every 14 days at
10 am in the subscriber's own time zone. 26 emails, about a year. Smart
sending is on, so nobody gets a recipe within 16 hours of another De Nada
email.

**The order alternates easy and ambitious**, so nobody gets three recipes in a
row that need a syrup they have to make. The two Añejo serves (our own
recipes, not from the guest bartenders) sit at 5 and 12 so the Añejo gets its
turn before the holidays.

**One template per email**, all from the same layout: wordmark, the cocktail
render in a framed card, eyebrow *Behind the bar · Blanco* (no numbers, so the
order can change without touching a template), cocktail name, one serif line,
the recipe as a spec list, the method in plain words, two buttons (green
"Shop the Blanco/Reposado/Añejo" → the product page on the left, orange "More
recipes" → `cocktails.html#<anchor>` on the right; the last email says "The
whole book"), the sign-off, green footer. Every link carries
`utm_campaign=btb-<anchor>` so Shopify can attribute orders to the specific
recipe. The nine ambitious recipes carry a grey "The short version" line with a
three-ingredient way in. Recipes and credits (Jillian Vose, Anthony Baker,
Lucinda Sterling) are the ones on `cocktails.html`. Tommy's Margarita is not
in the series because it is Welcome 2.

| # | Recipe | Bottle | Subject line | Master template |
|---|---|---|---|---|
| 01 | De Nada Paloma | Blanco | The drink we actually make most | `VmfYnM` |
| 02 | Mexican Style Old Fashioned | Reposado | The Old Fashioned, Jalisco style | `WgM4et` |
| 03 | Garden Party | Blanco | Cilantro, jalapeño and the Blanco | `ULRbX3` |
| 04 | Espresso Martini | Reposado | An espresso martini that finally makes sense | `RWfY6X` |
| 05 | Añejo Old Fashioned | Añejo | The Añejo Old Fashioned | `S3usMp` |
| 06 | Tequila Sunrise | Blanco | The Tequila Sunrise deserves better. Here it is. | `X2NmmU` |
| 07 | Rosita | Reposado | A Negroni that switched countries | `UVSsCn` |
| 08 | Mexico City Mule | Blanco | The mule, with the Blanco in it | `THg7vh` |
| 09 | Piña Rita | Reposado | A margarita that went on holiday | `YkhcRQ` |
| 10 | Southside of the Border | Blanco | Mint, lime and one slice of jalapeño | `UzzF7J` |
| 11 | Smoke & Spice Margarita | Reposado | A margarita for a cold night | `TxqkL9` |
| 12 | Café de Olla | Añejo | Coffee, cinnamon and the Añejo | `REWrfi` |
| 13 | Juan Collins | Blanco | The pitcher drink for when people keep arriving | `XqL92a` |
| 14 | Tikila Sunrise | Reposado | A tiki drink that grew up in Jalisco | `TNuBT3` |
| 15 | You're Welcome | Blanco | The drink named after us | `TtXAvt` |
| 16 | Mexico City to Manhattan | Reposado | A Manhattan, if it moved to Mexico City | `X4e7u5` |
| 17 | Passion Fruit Paloma | Blanco | The Paloma for the hottest week of the year | `T5qyNR` |
| 18 | A Huevo | Reposado | Stirred, bitter, a little pink | `Wx2Phy` |
| 19 | Michoacán Café | Blanco | The after-dinner drink for when nobody wants to leave | `Vy4Zbc` |
| 20 | Muchas Gracias | Reposado | The most involved drink in the book | `WsYNYw` |
| 21 | Hemingway Paloma | Blanco | A drier Paloma, with a maraschino turn | `UnTqiM` |
| 22 | Poolside Margarita | Blanco | A blue margarita, and not sorry about it | `W8tMAW` |
| 23 | White Bella | Blanco | A nightcap you would not expect from tequila | `X3YRsC` |
| 24 | Siempre Verde | Blanco | Green pepper, pear and sherry. Trust us. | `WZXRi7` |
| 25 | Blanco Bianco Highball | Blanco | Sage, wasabi and a lot of ice | `VrqJFh` |
| 26 | Sip N' Sin | Blanco | The last one in the book, and a thank-you | `Wgiybz` |

The two Añejo recipes, as sent (they are also on `cocktails.html` and the
Añejo product page):

> **Añejo Old Fashioned.** 2 oz De Nada Añejo, 1 barspoon agave nectar,
> 2 dashes Angostura bitters, 1 dash orange bitters. Stir with ice for twenty
> seconds, strain over one large cube, express an orange peel and drop it in.
>
> **Café de Olla.** 1.5 oz De Nada Añejo, 3 oz hot coffee brewed strong,
> ½ oz piloncillo (or brown sugar) syrup, a cinnamon stick, a strip of orange
> peel. Warm the mug, add syrup and Añejo, pour in the coffee, stir with the
> cinnamon stick, twist the peel over the top.

**To change one email:** edit its master template above, then open the flow
email in Klaviyo and re-select that template (Klaviyo clones it again). To add
a 27th recipe: clone a master, swap the copy, then rebuild the flow with the
extra delay and email (the API cannot add a step to an existing flow; Claude
can rebuild it in a minute, or add the step in the flow editor by hand).

**Existing subscribers don't enter a segment-triggered flow on their own.**
Launch morning: Flows → Behind the Bar → ⋯ → Back-populate → the *Email
subscribers (all)* segment. They all start at recipe 01, fourteen days later.

---

## Campaigns: the holidays (drafts, send times pre-set)

Three emails, all to the whole list, all Thursday 4 pm ET. Each has its own
master template. Before scheduling the second and third, confirm the order-by
dates with the retailer.

### Thu Nov 5: The gift that gets opened.

**Preview:** One bottle for every kind of person on your list.

> *(photo: the three bottles on the sunlit sideboard)*
>
> Most gifts get put on a shelf. A bottle of tequila gets opened, usually
> that evening, usually with the person who gave it. That's the whole reason
> we like giving it.
>
> **Blanco** for the friend who makes the margaritas. **Reposado** for the
> one who keeps a good whiskey at home. **Añejo** for the person who has
> everything and will still be quietly pleased.
>
> Sending it straight to them? Put their address at checkout. Someone 21 or
> over has to sign for the box, so pick a day they'll be home.
>
> [ **Shop now** → shop.html ]

### Thu Nov 12: What to bring on Thursday.

**Preview:** A bottle, and the drink to make with it.

> *(photo: the set table)*
>
> Wine is fine. A bottle of De Nada and an offer to make the first round is
> better, and it gets you out of dish duty more often than you'd think.
>
> Bring the **Blanco** and make a round of Palomas before people sit down.
> The **Reposado** for a Mexican Style Old Fashioned while the turkey rests.
> Or the **Añejo**, neat or in an Old Fashioned, for whoever is still at the
> table after the pie. The recipes are below, and the first two scale to a
> pitcher.
>
> De Nada Paloma · Blanco, grapefruit, lime, soda
> Mexican Style Old Fashioned · Reposado, mezcal, agave, chocolate bitters
> Añejo Old Fashioned · Añejo, agave, two kinds of bitters
>
> Order by Monday, November 16 and it should be there in time.
>
> [ **Shop now** → shop.html ]

### Thu Dec 10: Order by December 15.

**Preview:** After that we can't promise the 25th.

> *(photo: the toast)*
>
> Quick and practical: if a bottle is going under a tree, into a suitcase, or
> onto a table on the 24th, order it by Tuesday, December 15. Someone 21 or
> over has to sign for the box, so give it the room.
>
> If you're still deciding: **Blanco** for the margarita maker, **Reposado**
> for the whiskey drinker, **Añejo** for the person who's hard to buy for.
>
> Thank you for a good first few months. We'll see you in the new year.
>
> [ **Shop now** → shop.html ]

**Gift notes.** The emails deliberately do not promise a note in the box. If
the retailer will print order notes, turn on the cart note in the Shopify
theme and add one sentence to the Nov 5 and Dec 10 emails: "Want a note in the
box? Write it at checkout and we'll pass it along."

---

## Campaign rhythm after that: once a month

The recipes are automated, so campaigns are only for the things a flow can't
say:

| Slot | What | Where it comes from |
|---|---|---|
| 3rd week | **The Host's Notes**: one idea for hosting well | A ritual, a playlist, an event, a founders' story, a new bottle. This is the brand; the cocktail is the excuse. |

Clone a master template so each takes an hour. Send Thursday, 4 to 5 pm
local; people are planning the weekend. Smart sending keeps a campaign from
landing on top of a recipe.

---

## Setup, once

### 1. Shopify integration
Done. Placed Order, Checkout Started, Fulfilled Order and Delivered Shipment
events exist.

### 2. Sending domain (15 min, then wait up to a day)
Klaviyo → Settings → Domains → **Add branded sending domain** →
`send.denadatequila.com`. It gives you **3 CNAME records**. Add them at
Squarespace → DNS → Custom records, exactly as shown. Back in Klaviyo → Verify.
Until this is done, emails send from a shared Klaviyo domain and Gmail is
noticeably less kind to them.

While you're in DNS: Gmail's own DKIM is still missing (Google Admin → Apps →
Gmail → Authenticate email → add the TXT). And after a month of clean
sending, change `_dmarc` from `p=none` to `p=quarantine`.

### 3. Segments
Five exist (Email subscribers (all), Legacy subscribers, Opened since Oct 1,
Unengaged 90, Unengaged 180). Worth adding when there are orders:

| Name | Definition |
|---|---|
| Customers | Placed Order at least once |
| VIP | Placed Order at least 2 times |
| Engaged 90 | Opened email at least once in last 90 days |

### 4. The old list (done)
The Squarespace list was imported on Sept 18 and the old store's customers
arrived with the Shopify connection. The *Legacy subscribers* segment is
defined by subscribe method (list import, or the Shopify integration), so
there is nothing to tag. If another old list ever needs importing, import it
the same way and the segment picks it up; or set `signup_source` = `legacy`
on the import, which the segment also honours.

### 5. Launch day
- Pre-launch confirmation flow → **Draft** (off)
- The five other flows → **Live**
- Launch campaign → **Schedule**; Legacy hello → **Schedule**
- Behind the Bar flow → **Back-populate** with *Email subscribers (all)*
- Two days later: Launch resend → **Schedule**

### 6. Onsite tracking on the Shopify theme (optional)
There is no added-to-cart flow (it was cut on Sept 22 as one nudge too many;
the two abandoned checkout emails cover it). Onsite tracking is therefore
optional. Turning it on (Klaviyo → Integrations → Shopify → **Onsite
tracking**) records *Viewed Product* and *Active on Site*, which feed
Klaviyo's segments and analytics but nothing that sends. Do it when there is
time; nothing waits on it.

### 7. The signup card on the site
`js/signup-modal.js` shows a small Guest List card once per visitor (25
seconds on a page, or scrolling past 60%, or moving the mouse to the tab bar),
never on the QR welcome page, never to people arriving from an email, and
never again after they sign up anywhere on the site. It promises the five
easiest recipes, shows the links immediately, and Welcome 1 delivers them. To
turn it off, remove the `signup-modal.js` script tag from the pages.
