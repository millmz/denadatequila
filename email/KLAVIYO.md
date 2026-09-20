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
| Segment: Unengaged 90 (win-back) | `TXVT4s` | active | on list ≥ 90 days, no email open in 90 days, still subscribed |
| Segment: Unengaged 180 (sunset) | `QVtUiH` | active | on list ≥ 180 days, no open and no order in 180 days → **suppress these monthly** (Audience → segment → ⋯ → Suppress) |
| Launch campaign "It's here." | `01M2XKA0THK4TZ2PFTV4TVRD4Y` | Draft, send time pre-set Oct 1 9:00 am ET | Press *Schedule* on launch morning after the site is confirmed live |
| Master templates | Welcome 1 `WczNp9`, 2 `X44RVM`, 3 `T44PbR`, Launch `TXzT3x`, Abandoned `UBcbGw`, Post-purchase `RkRs58` / `Redbzd` / `XJSEPZ`, Win-back `UK2Wh9` | | Reuse for new campaigns: Content → Templates → clone |

**Launch morning, in Klaviyo (or say "go" and Claude does the first two):**
1. Flows → set Welcome, Abandoned checkout, Post-purchase, Win-back to **Live**.
2. Campaigns → "Launch: It's here." → Review → **Schedule**.

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

## Campaign rhythm: two a month

| Slot | What | Where it comes from |
|---|---|---|
| 1st week | **Behind the Bar**: one cocktail, one bottle, one photo | `cocktails.html` has 25 recipes. Two years of emails, already written. |
| 3rd week | **The Host's Notes**: one idea for hosting well | A ritual, a playlist, an event, a founders' story. This is the brand; the cocktail is the excuse. |

Both from the master templates so each takes an hour. Send Thursday, 4 to 5 pm
local; people are planning the weekend.

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
Two exist (Unengaged 90, Unengaged 180). Worth adding when there are orders:

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
- All four flows → **Live**
- Launch campaign → **Schedule** (time is pre-set)
