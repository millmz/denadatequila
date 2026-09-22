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

**Every email footer (compliance):**
> De Nada Tequila · [physical mailing address] · Must be 21+ to receive these
> emails. Please drink responsibly. [Unsubscribe]

Klaviyo inserts the unsubscribe link and address from *Settings → Organization*;
fill the address in there once.

---

## Built in Klaviyo (Sept 20, 2026)

Everything below exists in the account and is **in Draft**. Nothing sends until
launch day. Each flow email uses a *clone* of its master template, so to change
copy: edit the master, then re-select it on the flow email (Klaviyo clones it
again), or edit the flow's own copy directly.

| Thing | Klaviyo ID | Status | Trigger / rule |
|---|---|---|---|
| Welcome flow | `UQqXn7` | Draft until Oct 1 | Added to list `WXrq3N`; every email skips anyone who has *Placed Order* |
| Welcome 1 "You're welcome." | action `117746850` | | immediately |
| Welcome 2 "Three bottles. One rule." | action `117746852` | | +3 days |
| Welcome 3 "The house margarita" | action `117746854` | | +4 days |
| Abandoned checkout | `YrGtJd` | Draft until Oct 1 | *Checkout Started* → 1 h → "Your cart is still here." unless they ordered since. Re-entry after 7 days |
| Post-purchase | `XDqUqN` | Draft until Oct 1 | *Fulfilled Order* → 5 d "The first drink" → 25 d "How was it?" → 30 d "The other one" (skipped if they re-ordered). 10 am local |
| Win-back | `SwCgXT` | Draft until Oct 1 | joins segment *Unengaged 90* → "It's been a while." |
| Behind the Bar (recipe series) | `UHxbFP` | Draft until Oct 1 | joins segment *Email subscribers (all)* → 14 days → one recipe every 14 days, 24 emails, about 48 weeks. 10 am local. Each profile goes through once |
| Segment: Email subscribers (all) | `S2hYpZ` | active | anyone subscribed to email marketing (signup form, launch list and Shopify customers alike). Trigger for the recipe series |
| Segment: Unengaged 90 (win-back) | `TXVT4s` | active | on list ≥ 90 days, no email open in 90 days, still subscribed |
| Segment: Unengaged 180 (sunset) | `QVtUiH` | active | on list ≥ 180 days, no open and no order in 180 days → **suppress these monthly** (Audience → segment → ⋯ → Suppress) |
| Launch campaign "It's here." | `01M2XKA0THK4TZ2PFTV4TVRD4Y` | Draft, send time pre-set Oct 1 9:00 am ET | Press *Schedule* on launch morning after the site is confirmed live |
| Master templates | Welcome 1 `WczNp9`, 2 `X44RVM`, 3 `T44PbR`, Launch `TXzT3x`, Abandoned `UBcbGw`, Post-purchase `RkRs58` / `Redbzd` / `XJSEPZ`, Win-back `UK2Wh9`, Behind the Bar 01–24 (IDs in Flow 5 below) | | Reuse for new campaigns: Content → Templates → clone |

**Hero photos (added Sept 22).** Every email now carries one photo from the
dinner shoot under the wordmark, served from `denadatequila.com/img/email/`
(1200 px JPEG; the files are on `main` and on `teaser`, so previews work
before launch). Landscape shots run full width; portraits sit in a 440 px
framed card. Welcome 1 the tray pour, Welcome 2 the sideboard lineup,
Welcome 3 Adam at the shaker, Launch the table toast, Abandoned the Blanco on
the table, Post-purchase 1 Danny pouring, 2 the pink drink, 3 the two set
bottles, Win-back the Paloma pour. To swap one: change the `<img src>` in the
master, then re-select the master on the flow email (or, for the campaign,
re-assign it to the message). Full photo index in `PHOTOS.md`.

**Launch morning, in Klaviyo (or say "go" and Claude does the first two):**
1. Flows → set Welcome, Abandoned checkout, Post-purchase, Win-back and Behind the Bar to **Live**.
2. Campaigns → "Launch: It's here." → Review → **Schedule**.
3. Flows → Behind the Bar → ⋯ → **Back-populate** → everyone already in *Email subscribers (all)*. This is the one thing the API can't do; without it the existing subscribers never enter the series.

**Still needed from you (Settings → Organization):** street address (footer is
blank without it; legally required) and default sender email
`orders@denadatequila.com`. Then Settings → Domains → branded sending domain.

**Product titles matter.** The post-purchase emails pick the recipe and the
cross-sell by looking for "Blanco", "Reposado" or "ejo" in the Shopify product
title. Keep those words in every title, glass and Travel Bottle alike.

---

## Flow 1: Welcome

**Trigger:** *Subscribed to List* → the list.
**Filter:** has not *Placed Order* (customers get the post-purchase flow instead).

### Email 1, immediately

**Subject:** You're welcome.
**Preview:** That's what De Nada means. It's also the whole idea.

> **De Nada means "you're welcome."**
>
> Not the polite reflex. The real thing.
>
> Thank you for signing up. We're glad you're here. What we're after is the
> feeling of walking into a friend's place and being handed a drink before
> you've taken your coat off. That's what we're trying to bottle.
>
> We're Danny and Adam. We started De Nada going door to door with a few cases
> and an idea about hospitality. A few years on, the tequila is made at
> NOM 1414 in the highlands of Jalisco, from estate-grown agave, with nothing
> added. We're pretty proud of it.
>
> There are three glass bottles now: **Blanco, Reposado and our first Añejo.**
> And a site built around the thing we care about most, which is what happens
> when you open one with people you like.
>
> We'll write when there's something worth your time: a new bottle, a recipe
> we can't stop making, the occasional dinner. Never more than that. And if
> you ever have a question, just reply. It comes straight to us.
>
> [ **See the bottles** → denadatequila.com/shop.html ]
>
> De Nada,
> Danny & Adam

### Email 2, day 3

**Subject:** Three bottles. One rule.
**Preview:** Made to be opened, not collected.

> A quick introduction to the three of them, since you'll be seeing them
> around. All from one distillery, NOM 1414 in the highlands of Jalisco, and
> nothing added to any of them. Open whichever one fits the evening.
>
> **Blanco:** bright and agave-forward, vanilla and lime. The house margarita
> starts here. Double Gold, Agavos Awards 2025. *$49.99*
>
> **Reposado:** four months in ex-bourbon American oak. Vanilla, caramel and a
> smoky finish. The bottle for the end of the day. Gold, Agavos 2025. *$54.99*
>
> **Añejo:** our first. A year and more in oak. Chocolate, spice, a delicate
> finish. Sip it. Gold, Agavos 2026. *$79.99*
>
> Estate-grown agave, cooked slow in brick ovens, twice distilled in copper.
> Classical music during fermentation, because that's the kind of place it is.
> We think you'll taste the difference.
>
> [ **See the bottles** → denadatequila.com/shop.html ]
>
> De Nada,
> Danny & Adam

### Email 3, day 7

**Subject:** The house margarita
**Preview:** Three ingredients. You probably have two of them.

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
> That's it. If you'd like the other twenty-four, they're on the site, and
> every one of them tells you which bottle it wants. Make one this weekend and
> let us know how it goes.
>
> [ **Behind the Bar** → denadatequila.com/cocktails.html ]
> [ **Get the Blanco** → denadatequila.com/product-blanco.html ]
>
> De Nada,
> Danny & Adam

---

## Campaign: Launch day (October 1st, to everyone)

**Subject:** It's here.
**Preview:** New bottles. New home.

> **It's here.** New bottles. New home.
>
> The new De Nada is open, and we wanted you to be the first to see it. Three
> glass bottles: Blanco, Reposado and our first Añejo. And a site that's less
> about the tequila than about what you do with it and who you share it with.
>
> Come in and have a look around. And thank you for waiting with us. It means
> a lot.
>
> [ **See the bottles** → denadatequila.com/shop.html ]
>
> De Nada,
> Danny & Adam

---

## Flow 2: Abandoned checkout

**Trigger:** *Checkout Started*, filter: no *Placed Order* since. One email,
1 hour later. No discount; it trains people to abandon.

**Subject:** Your cart is still here.
**Preview:** We kept it for you. No rush.

> **Still here.** We kept it for you. No rush.
>
> Hi. You were a click away from the {{ item name }}, so we saved it in your
> cart for whenever you're ready.
>
> [ **Back to checkout** → {{ checkout URL }} ]
>
> If a question got in the way, about shipping or anything else, just reply to
> this email. One of us will get back to you personally.
>
> De Nada,
> Danny & Adam

---

## Flow 3: Post-purchase

**Trigger:** *Fulfilled Order*. Shopify's own confirmation and shipping emails
go out first; these add what they can't say.

| When | Subject | The one thing it does |
|---|---|---|
| Fulfilled + 5 days | The first drink | The recipe for their bottle |
| + 25 days | How was it? | One question, reply by email, nothing else |
| + 30 days | The other one | Blanco buyers meet the Reposado; Reposado → Añejo; Añejo → the Blanco for cocktails. Skipped if they re-ordered |

### Email 1: The first drink

**Preview:** One recipe. The right one.

> By now the bottle should be on your counter. Thank you, truly, for bringing
> it home. Here's what we'd make first.
>
> *(Conditional on the item name, one recipe per bottle:)*
>
> **Blanco: Tommy's Margarita.** 2 oz Blanco, 1 oz lime, ½ oz agave. Shake hard, strain over fresh ice. Lime wedge.
> **Reposado: Mexican Style Old Fashioned.** 2 oz Reposado, ¼ oz mezcal, ¼ oz agave, 4 dashes Mexican chocolate bitters. Stir over ice, one large cube, orange peel.
> **Añejo: Neat.** One large cube if you like. Let it sit a minute before the first sip; it opens up.
>
> Then invite someone over. That's the part we care about most, and we hope
> it's a good night.
>
> [ **More recipes** → denadatequila.com/cocktails.html ]
>
> De Nada,
> Danny & Adam

### Email 2: How was it?

**Preview:** We'd genuinely like to know.

> It's been about a month since the bottle arrived, and we'd love to hear how
> it went. What you made with it, who you shared it with, whether it earned a
> spot on the counter.
>
> Just hit reply. One line is plenty, and it comes straight to Danny and Adam,
> not a form. Thank you for being one of the first.
>
> [ **Tell us** → mailto:orders@denadatequila.com ]
>
> De Nada,
> Danny & Adam

### Email 3: The other one

**Preview:** You've met one bottle. Here's the next.

> *(Bought Añejo:)* You started at the top, and we respect that. The Añejo is a sipper; the
> **Blanco** is the one that makes the drinks. Bright and agave-forward,
> vanilla and lime. The house margarita starts here, and so does most of the
> cocktail book.
>
> *(Bought Reposado:)* The Reposado is the bottle for the end of the day. The
> **Añejo** is what comes after: a year and more in oak, chocolate and spice,
> a delicate finish. It's our first, and we're a little sentimental about it.
> Sip it neat when the evening slows down.
>
> *(Bought Blanco:)* The Blanco is where the drinks start. The **Reposado** is
> where the evening goes: four months in ex-bourbon oak, vanilla and caramel,
> a smoky finish. Gold at the Agavos Awards, and the bottle for an Old
> Fashioned.
>
> No pressure at all. We just had a feeling you'd like it, and we'd rather you
> hear about it from us.
>
> [ **Meet the …** → that bottle's product page ]
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
> making most lately, in case it's useful this weekend. If you'd rather not
> hear from us anymore, the link at the bottom takes care of it, no questions
> asked.
>
> **De Nada Paloma**
> 2 oz De Nada Blanco · 2 oz fresh grapefruit juice · ½ oz fresh lime ·
> ¼ oz agave nectar · club soda to top. Shake everything but the soda. Strain
> over ice, top with soda. Grapefruit wedge.
>
> [ **Behind the Bar** → denadatequila.com/cocktails.html ]
>
> De Nada,
> Danny & Adam

Then a **sunset**: anyone still unengaged at 180 days → suppress. Unengaged
addresses drag every other email into spam.

---

## Flow 5: Behind the Bar (evergreen recipe series)

The email that keeps going after the welcome week. Flow `UHxbFP`.

**Trigger:** joins segment *Email subscribers (all)* `S2hYpZ`, which is every
profile subscribed to email marketing, so form signups and Shopify customers
both get it. Each profile goes through once. **Timing:** 14 days after joining
(so it starts a week after Welcome 3), then one email every 14 days at 10 am
in the subscriber's own time zone. 24 emails, about 48 weeks. Smart sending is
on, so nobody gets a recipe within 16 hours of another De Nada email.

**One template per email**, all from the same layout as the rest: wordmark,
eyebrow *Behind the Bar · No. 07 · Blanco*, cocktail name, one serif line,
the recipe as a spec list, the method in plain words, two buttons ("More
recipes" → `cocktails.html#<anchor>`, "Get the Blanco/Reposado" → the product
page), the "De Nada, Danny & Adam" sign-off, green footer. Every one links
with `utm_campaign=btb-NN` so Shopify can attribute orders to the specific
recipe. Recipes and credits (Jillian Vose, Anthony Baker, Lucinda Sterling)
are the ones on `cocktails.html`. Tommy's Margarita is not in the series
because it is already Welcome 3.

| # | Subject | Bottle | Preview | Master template |
|---|---|---|---|---|
| 01 | De Nada Paloma | Blanco | The weekend in a glass. | `VmfYnM` |
| 02 | Mexican Style Old Fashioned | Reposado | For the friends who stay late. | `WgM4et` |
| 03 | Garden Party | Blanco | Bright, green, a little heat. | `ULRbX3` |
| 04 | Espresso Martini | Reposado | The Reposado twist on a modern classic. | `RWfY6X` |
| 05 | Southside of the Border | Blanco | Mint, lime and one slice of jalapeño. | `UzzF7J` |
| 06 | Smoke & Spice Margarita | Reposado | For the fire starters. | `TxqkL9` |
| 07 | Juan Collins | Blanco | Tall, cold and a little green. | `XqL92a` |
| 08 | Piña Rita | Reposado | A margarita that went on holiday. | `YkhcRQ` |
| 09 | Mexico City Mule | Blanco | Ginger beer with a proper kick. | `THg7vh` |
| 10 | Mexico City to Manhattan | Reposado | Stirred, serious, and worth it. | `X4e7u5` |
| 11 | Hemingway Paloma | Blanco | The Paloma, with a maraschino turn. | `UnTqiM` |
| 12 | Tikila Sunrise | Reposado | A tiki drink that grew up in Jalisco. | `TNuBT3` |
| 13 | You're Welcome | Blanco | The namesake. | `TtXAvt` |
| 14 | Rosita | Reposado | A Negroni that switched countries. | `UVSsCn` |
| 15 | Tequila Sunrise | Blanco | The classic, done properly. | `X2NmmU` |
| 16 | A Huevo | Reposado | Stirred, bitter, a little pink. | `Wx2Phy` |
| 17 | Passion Fruit Paloma | Blanco | The Paloma, somewhere warmer. | `T5qyNR` |
| 18 | Muchas Gracias | Reposado | The deep end. | `WsYNYw` |
| 19 | Poolside Margarita | Blanco | Blue, and not sorry about it. | `W8tMAW` |
| 20 | White Bella | Blanco | A White Russian, if it moved to Mexico. | `X3YRsC` |
| 21 | Michoacán Café | Blanco | Coffee, hazelnut, and the Blanco. | `Vy4Zbc` |
| 22 | Siempre Verde | Blanco | Green pepper, pear and sherry. | `WZXRi7` |
| 23 | Blanco Bianco Highball | Blanco | Sage, wasabi and a lot of ice. | `VrqJFh` |
| 24 | Sip N' Sin | Blanco | Stirred, cold, no ice. Closes the series with a thank-you. | `Wgiybz` |

Flow actions in Klaviyo: entry delay `117762873`, then email/delay pairs from
`117762874` to `117762922` in order (the flow editor shows them numbered;
email 16 onward are `117762906` to `117762922`, there is no action `117762904`).

**Photos (Sept 22):** each recipe email has a hero under the wordmark.
Blanco recipes rotate through the Paloma pour (01, 11), the guest sipping
(03), the grapefruit board (05, 19), Danny's jigger (07, 20), Adam at the
shaker (09, 21), the Blanco on the table (13, 22), the pink drink (15), the
tray pour (17, 23) and the table toast (24). Reposado recipes rotate through
the rocks glass (02, 16), the strain (04, 18), the Reposado on the table
(06, 14), the second strain (08), the bottle behind the back (10) and the
overhead table (12).

**To change one email:** edit its master template above, then open the flow
email in Klaviyo and re-select that template (Klaviyo clones it again). To
add a 25th recipe later: clone `Wgiybz`, swap the copy, add a 14-day delay
and an email at the end of the flow.

**Existing subscribers (the 452 already on the list) don't enter a
segment-triggered flow on their own.** Launch morning: Flows → Behind the Bar →
⋯ → Back-populate → the *Email subscribers (all)* segment. They all start at
recipe 01, fourteen days later.

---

## Campaign rhythm: once a month

The recipes are automated now, so campaigns are only for the things a flow
can't say:

| Slot | What | Where it comes from |
|---|---|---|
| 3rd week | **The Host's Notes**: one idea for hosting well | A ritual, a playlist, an event, a founders' story, a new bottle. This is the brand; the cocktail is the excuse. |

Clone a master template so each takes an hour. Send Thursday, 4 to 5 pm
local; people are planning the weekend. Smart sending keeps a campaign from
landing on top of a recipe.

---

## Setup, once

### 1. Shopify integration
Done. Placed Order, Checkout Started and Fulfilled Order events exist.

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
Three exist (Email subscribers (all), Unengaged 90, Unengaged 180). Worth
adding when there are orders:

| Name | Definition |
|---|---|
| Customers | Placed Order at least once |
| VIP | Placed Order at least 2 times |
| Engaged 90 | Opened email at least once in last 90 days |

### 4. The old list
Squarespace → Marketing → Email Campaigns → Mailing lists → Export CSV.
Klaviyo → Audience → Lists → the list → Import → upload → set the property
`signup_source` = `legacy` on import. They're existing subscribers, so they
enter the welcome flow only if you want them to; the launch campaign reaches
them regardless.

### 5. Launch day
- All five flows → **Live**
- Launch campaign → **Schedule** (time is pre-set)
- Behind the Bar flow → **Back-populate** with *Email subscribers (all)*
