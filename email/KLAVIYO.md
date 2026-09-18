# Klaviyo — flows, campaigns and setup

Copy for every automated email, in the brand voice, ready to paste. Plus the
one-time setup that makes them deliverable. Signups already land in the list
(`js/list-config.js`); this is what happens after.

**Voice, in one line:** a good host. Warm, direct, a little dry. Never "we're
so excited". Never an exclamation mark doing the work a sentence should.

**Every email footer (compliance):**
> De Nada Tequila · DNA Spirits LLC · [physical mailing address] · Must be 21+ to
> receive these emails. Please drink responsibly. [Unsubscribe]

Klaviyo inserts the unsubscribe link and address from *Settings → Organization*;
fill the address in there once.

---

## Timing: what goes live when

| | Now (teaser) | October 1st |
|---|---|---|
| Welcome 1 | **live** | live |
| Welcome 2, 3 | draft — they link to pages that don't exist yet | **turn live** |
| Launch campaign | — | **send to everyone** |
| Pre-order flow | live (products are buyable) | live |
| Post-purchase, abandoned checkout | live | live |

Anyone who signs up on the teaser gets Welcome 1 now and the launch campaign on
the 1st. That's the right amount of email for a list that has nothing to buy
yet.

---

## Flow 1 — Welcome

**Trigger:** *Subscribed to List* → Guest List.
**Filter:** has not *Placed Order* (customers get the post-purchase flow instead).

### Email 1 — immediately

**Subject:** You're welcome.
**Preview:** That's what De Nada means. It's also the whole idea.

> **De Nada means "you're welcome."**
>
> Not the polite reflex — the real thing. The feeling of walking into a
> friend's place and being handed a drink before you've taken your coat off.
> That's what we're trying to bottle.
>
> We're Danny and Adam. We started De Nada going door to door with aluminum
> bottles and an idea about hospitality. A few years on, the tequila is made at
> NOM 1414 in the highlands of Jalisco, from estate-grown agave, with nothing
> added — and it's about to get a new home.
>
> **On October 1st** we relaunch: three new glass bottles — Blanco, Reposado
> and a first-ever Añejo — and a site built around the thing we actually care
> about, which is what happens when you open one.
>
> You're on the list, so you'll hear first. Until then, the Originals are still
> pouring.
>
> [ **Shop the Originals** → shop.denadatequila.com ]
>
> De nada,
> Danny & Adam

### Email 2 — day 3 *(live from Oct 1)*

**Subject:** Three bottles. One rule.
**Preview:** Pour it. Don't shelf it.

> **The rule:** these are made to be opened, not collected.
>
> **Blanco** — bright and agave-forward, vanilla and lime. The house margarita
> starts here. Double Gold, Agavos Awards 2025. *$49.99*
>
> **Reposado** — four months in ex-bourbon American oak. Vanilla, caramel and a
> smoky finish. The golden-hour pour. Gold, Agavos 2025. *$54.99*
>
> **Añejo** — our first. A year and more in oak. Chocolate, spice, a delicate
> finish. Sip it. Gold, Agavos 2026. *$79.99*
>
> All three: additive-free, estate-grown agave, cooked slow in brick ovens,
> twice distilled in copper. Classical music during fermentation, because
> that's the kind of place NOM 1414 is.
>
> [ **See the bottles** → denadatequila.com/shop.html ]
>
> De nada,
> Danny & Adam

### Email 3 — day 7 *(live from Oct 1)*

**Subject:** The house margarita
**Preview:** Three ingredients. No excuses.

> This is the one we make when people come over. It's the reason the Blanco
> exists.
>
> **Tommy's Margarita**
> 2 oz De Nada Blanco
> 1 oz fresh lime
> ½ oz agave nectar
>
> Shake hard with ice. Strain over fresh ice. Salt if you want it; we usually
> don't. Lime wheel.
>
> That's it. If you'd like the other twenty-four, they're on the site — and
> every one of them tells you which bottle it wants.
>
> [ **Behind the Bar** → denadatequila.com/cocktails.html ]
> [ **Pre-order the Blanco** → denadatequila.com/product-blanco.html ]
>
> De nada,
> Danny & Adam

---

## Campaign — Launch day (October 1st, to everyone)

**Subject:** It's here.
**Preview:** New bottles. New home. Same spirit of generosity.

> **The new De Nada is open.**
>
> Three glass bottles — Blanco, Reposado and our first Añejo — and a site
> that's less about the tequila than about what you do with it.
>
> The bottles ship early October. Pre-orders are open now, and the guest list
> gets first pour.
>
> [ **Pre-order** → denadatequila.com/shop.html ]
>
> Come in. The bar's open.
>
> De nada,
> Danny & Adam

---

## Flow 2 — Pre-order

**Trigger:** *Placed Order* where item name contains "700ml".
Shopify's own order confirmation goes out first; these add what it can't say.

### Email 1 — 1 hour after order

**Subject:** What happens next
**Preview:** You're in early. Here's the plan.

> Thanks for pre-ordering the {{ item name }}.
>
> Here's what happens: the bottles land with us in early October, we pack yours
> the day they arrive, and you'll get a shipping email with tracking. An adult
> (21+) needs to sign for it.
>
> Between now and then, we'll send exactly one more email — when it ships. If
> anything changes, you'll hear it from us first.
>
> De nada,
> Danny & Adam

### Email 2 — "It's shipped" *(send as a one-time campaign to this segment when they go out; don't automate a date you can't promise)*

**Subject:** On its way
**Preview:** Your bottle left the building.

> Your {{ item name }} shipped today. Tracking is in the Shopify email that
> arrived alongside this one.
>
> One request: don't put it on a shelf. Next week we'll send you the one
> cocktail it was made for.
>
> De nada,
> Danny & Adam

### Email 3 — 5 days after shipping

**Subject:** The first pour
**Preview:** One recipe. The right one.

> By now the {{ item name }} should be on your counter. This is what to do with
> it.
>
> *(Conditional split on the item — one recipe per bottle:)*
>
> **Blanco → Tommy's Margarita** — 2 oz Blanco, 1 oz lime, ½ oz agave. Shake, strain, fresh ice.
> **Reposado → De Nada Paloma** — 2 oz Reposado, top with grapefruit soda, squeeze of lime, salt rim.
> **Añejo → Neat, one large cube** — and if you must: an Old Fashioned. 2 oz Añejo, ¼ oz agave, 2 dashes bitters, orange peel.
>
> Then invite someone over. That's the whole point.
>
> [ **More recipes** → denadatequila.com/cocktails.html ]
>
> De nada,
> Danny & Adam

---

## Flow 3 — Abandoned checkout

**Trigger:** *Started Checkout*, filter: no *Placed Order* since. One email, 1 hour later. No discount — it trains people to abandon.

**Subject:** Left something at the bar?
**Preview:** Your cart's still here.

> You were a click away from a {{ item name }}. It's still there.
>
> [ **Back to checkout** → {{ checkout URL }} ]
>
> If something got in the way — a question, a shipping worry — reply to this
> email. A person reads it.
>
> De nada,
> Danny & Adam

---

## Flow 4 — Post-purchase (any order, not a pre-order)

| When | Subject | The one thing it does |
|---|---|---|
| Delivered + 7 days | The first pour | The recipe for their bottle (reuse Pre-order email 3) |
| + 30 days | How was it? | One question, a link to leave a review, nothing else |
| + 60 days | The other one | If they bought Blanco, introduce Reposado; Reposado → Añejo; Añejo → the Blanco for cocktails |

## Flow 5 — Win-back

**Trigger:** no email opened in 90 days. One email.

**Subject:** Still pouring?
**Preview:** One recipe, no strings.

> It's been a while. No hard feelings — here's the best thing we've made all
> season, and if you'd rather not hear from us, the link at the bottom does
> that in one click.
>
> *(Current Behind the Bar recipe)*
>
> De nada,
> Danny & Adam

Then a **sunset**: anyone still unengaged at 180 days → suppress. Unengaged
addresses drag every other email into spam.

---

## Campaign rhythm — two a month

| Slot | What | Where it comes from |
|---|---|---|
| 1st week | **Behind the Bar** — one cocktail, one bottle, one photo | `cocktails.html` has 25 recipes. Two years of emails, already written. |
| 3rd week | **The Host's Notes** — one idea for hosting well | A ritual, a playlist, an event, a founders' story. This is the brand; the cocktail is the excuse. |

Both as Klaviyo saved templates so each takes an hour. Send Thursday, 4–5 pm
local — people are planning the weekend.

---

## Setup, once

### 1. Shopify integration (10 min)
Klaviyo → Integrations → Shopify → Connect → sign in to Shopify → approve.
Turn on: *Sync customers who accept marketing* and *Sync orders*. From here on
Placed Order / Started Checkout / Delivered events exist, and the flows above
can trigger on them.

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
Audience → Lists & Segments → Create segment:

| Name | Definition |
|---|---|
| Prospects | In Guest List AND Placed Order zero times |
| Pre-order customers | Placed Order at least once where item name contains "700ml" |
| Customers | Placed Order at least once |
| VIP | Placed Order at least 2 times |
| Engaged 90 | Opened email at least once in last 90 days |
| Unengaged 180 | Opened email zero times in last 180 days AND on list > 180 days |

### 4. The old list
Squarespace → Marketing → Email Campaigns → Mailing lists → Export CSV.
Klaviyo → Audience → Lists → Guest List → Import → upload → set the property
`signup_source` = `legacy` on import. They're existing subscribers, so they
enter the welcome flow only if you want them to; the launch campaign reaches
them regardless.

### 5. Turn things on
- Welcome flow: Email 1 **Live** now; Emails 2–3 **Draft** until Oct 1
- Pre-order flow: Live
- Abandoned checkout: Live
- Post-purchase, Win-back: Live
- Launch campaign: schedule for **Oct 1, 9 am ET**, to Guest List minus Unengaged 180
