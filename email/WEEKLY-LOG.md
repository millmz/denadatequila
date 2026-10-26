# Klaviyo weekly log

One section per check-in. The Monday routine appends to this file; IDs and
definitions live in `KLAVIYO.md`. Thresholds that count as a problem: spam
complaints over 0.3% on a send, bounces over 2%, unsubscribes over 1%,
delivery under 97%, a flow that stopped sending, a Draft campaign due within
14 days, the sending domain not active, zero orders for 7 days.

## Baseline, Thu Oct 9, 2026 (manual audit, day 8 after launch)

| Figure | Value |
|---|---|
| Email List | 645 (peak 658 after the Oct 1 import) |
| Email subscribers (all) segment | 631 |
| Opened an email since Oct 1 | 377 |
| Unengaged 90 / Unengaged 180 | 0 / 0 (expected until late December) |
| Sending domain | hello.denadatequila.com, active |
| Orders since Oct 1 | 4, $992 (1 on Oct 1, 3 on Oct 2, none since) |
| New list signups since Oct 2 | about 1 to 2 a day from the site |
| Unsubscribes since Oct 1 | 19 (9 Legacy hello, 5 Welcome 1, 3 Welcome 3, 1 unsubscribe page, 1 Post-purchase 1) |
| Spam complaints | 3, all WordPress import, on Welcome 1 (2) and Welcome 3 (1) |
| Hard bounces | 18, all from the Legacy hello, suppressed automatically |

Campaigns: Launch (33 sent, 58% open, 18% click), Legacy hello (447 sent,
96% delivered, 59% open, 10% click, 3 orders $591), Resend Oct 4 (34 sent,
59% open, 9% click). Gifts scheduled Nov 5. Thanksgiving (Nov 12) and
Holidays (Dec 10) still Draft pending the retailer's order-by dates.

Flows: Welcome 1/2/3 at 190/169/163 recipients, 50/46/45% open, 3/1/3%
click. Abandoned checkout 8 sends, 7 opens, 2 clicks. Post-purchase 1 to 3
people, 1 unsubscribe. Behind the Bar recipe 01 due Oct 15. Win-back idle.

Watch items: Welcome-series spam rate 0.58% (cohort effect from the WordPress
import; should dilute). Store quiet since Oct 2. Nothing list-wide scheduled
between Oct 4 and Nov 5.

Actions taken Oct 9, after Adam approved the recommendations:
- New segment *WordPress import, no opens since Oct 1* (`VDMmfw`, 85 people).
- Gifts (Nov 5) reverted to Draft, that segment excluded, rescheduled for the
  same time. Status back to Scheduled.
- Añejo campaign "The slow one." built as Draft (`01M4GQ8K40JDMXTR82XJDXEX8B`),
  list minus `VDMmfw`. Adam approved the copy and it is Scheduled for
  Oct 22, 10 am ET.
- Still open: order-by dates from the retailer for Thanksgiving and Holidays.

## Mon Oct 12, 2026 (routine run 1, window Oct 5 to Oct 12)

| Figure | This week | Oct 9 baseline |
|---|---|---|
| Email List | 645 | 645 |
| Email subscribers (all) segment | 631 | 631 |
| Opened an email since Oct 1 | 379 | 377 |
| WordPress import, no opens (excluded) | 84 | 85 |
| Unengaged 90 / 180 | 0 / 0 | 0 / 0 |
| Sending domain | active | active |
| Orders this week | 0 (last order Oct 2) | 4 since Oct 1 |
| Checkouts started this week | 5 (Oct 8 to 11), none completed | 11 on Oct 1 and 2 |
| New list signups | 9 (Oct 5 to 10), 0 on Oct 11 and 12 | 1 to 2 a day |
| Unsubscribes since Oct 9 | 2 (one from Welcome 3, one from Welcome 2; both homepage signups) | 19 total since Oct 1 |
| Spam complaints since Oct 9 | 0 | 3 total |

Campaigns: nothing sent in the window. Añejo "The slow one." Scheduled
Oct 22, 10 am ET. Gifts Scheduled Nov 5. Thanksgiving (Nov 12) and Holidays
(Dec 10) still Draft; Thanksgiving falls inside the 14-day window on Oct 29.

Flows (event counts for Oct 5 to 11, from metric aggregates because the flow
report needed an approval prompt this run): Welcome 3 went to 166 people
(the WordPress cohort reaching day 7), 76 unique opens, 46%. Welcome 1 and
2 went to 10 and 11 new signups, 7 and 32 opens counting late opens of
earlier sends. Abandoned checkout 1 and 2 sent 4 each, 5 unique opens, no
recovered orders. Post-purchase 3 sent to 3, 2 opens. Behind the Bar recipe
01 due Oct 15. Win-back idle. All five live flows are sending.

Problems: zero orders for 10 days, which trips the 7-day threshold. Five
checkouts started Oct 8 to 11 and none finished, after 11 starts and 4
orders on launch days. Signups stopped on Oct 11 and 12 (first two days at
zero since launch). Shopify checks (orders, abandoned checkouts) needed an
approval prompt in this run, so the drop-off reason is unverified.

Recommendations given to Adam: look at the five abandoned checkouts in
Shopify for a common blocker (ship-to state, age check, payment); confirm
the Oct 11 and 12 signup gap is real and the homepage form is working; keep
the Oct 22 Añejo send as the next revenue moment. No new flow built; no
trigger condition met (first Behind the Bar send not until Oct 15).

## Sun Oct 18, 2026 (Adam asked why he had not received Behind the Bar)

Finding: recipe 01 went out Oct 15 as planned, but only to the 164 people who
joined *Email subscribers (all)* after the flow went live on Oct 1 (160 from
the WordPress import, 4 site signups). Opens 62 unique (38%), clicks 7 (4%).
The Oct 1 segment-definition trick recorded in `KLAVIYO.md` as a successful
API back-populate did not trigger the flow; the ~465 pre-launch subscribers,
Adam and Danny included, never entered it. Checked by matching the Oct 15
recipient list against the WordPress import file: 160 of 162 matched.

Everything else is set up and sending: Welcome 1/2/3 to new signups this week
(13/10/9), Abandoned checkout 1 and 1, Post-purchase 3 to 2. Añejo campaign
still Scheduled Oct 22, 10 am ET; Gifts Nov 5. No skipped sends.

Fix: Klaviyo has no back-populate endpoint, so Adam clicks Flows → Behind the
Bar → ⋯ → Back-populate flow recipients. Already-entered profiles are skipped.
Options offered: (A) click as is, recipe 01 lands about Nov 1 at 10 am local;
(B) shorten the first delay for the day of the click so recipe 01 lands two
days later, then restore 14 days. `KLAVIYO.md` corrected.

Oct 18, 11:36 am ET: Adam chose option B. The first delay in Behind the Bar
(action `118028371`) was set to **2 days** by API, pending his UI back-populate
click. Reminder sent 2:39 pm ET. Oct 19, 2:41 am ET: no confirmation yet; the
delay is still 2 days. It goes back to 14 days as soon as he confirms the
click. Until then a new signup gets recipe 01 two days after joining.

## Mon Oct 19, 2026 (routine run 2, window Oct 12 to Oct 19)

| Figure | This week | Oct 12 |
|---|---|---|
| Email List | 658 | 645 |
| Email subscribers (all) segment | 639 | 631 |
| Opened an email since Oct 1 | 390 | 379 |
| WordPress import, no opens (excluded) | 80 | 84 |
| Unengaged 90 / 180 | 0 / 0 | 0 / 0 |
| Sending domain | active | active |
| Orders this week | 3, $469 (Oct 12 $71, Oct 14 $197, Oct 16 $201) | 0 |
| Checkouts started this week | 4, 3 completed | 5, 0 completed |
| New list signups | 15 (about 7 look like bots) | 9 |
| Unsubscribes since Oct 12 | 3 (Welcome 1 link, Welcome 1 spam report, Behind the Bar 01 one-click) | 2 |
| Spam complaints since Oct 12 | 1 (Welcome 1, an Oct 17 homepage signup that looks automated) | 0 |
| Bounces | 0 | 0 |

Campaigns: nothing sent in the window. Añejo Scheduled Oct 22, 10 am ET.
Gifts Scheduled Nov 5. Thanksgiving (Nov 12) and Holidays (Dec 10) Draft;
Thanksgiving enters the 14-day window on Oct 29. Last 30 days: Launch 33
sent 58% open 18% click; Legacy hello 447 sent 96% delivered 60% open 10%
click 3 orders $591; Resend 34 sent 62% open 12% click.

Flows, last 7 days (flow report): Behind the Bar 01 165 sent, 38% open,
1.2% click, 1 unsubscribe. Welcome 1 14 sent, 21% open, 1 spam, 1 unsub.
Welcome 2 10 sent, 20% open. Welcome 3 9 sent, 44% open. Post-purchase 1 to
5, 20% open. Abandoned checkout 1 and 2 to 1 each. Win-back idle. All live.

Problems: (1) Behind the Bar first delay still 2 days, waiting for Adam's
UI back-populate click since Oct 18; ~465 pre-launch subscribers still not
in the flow. (2) Homepage signup form is getting bot signups: dotted-Gmail
and random-suffix addresses (about 7 of 15 this week, plus earlier ones),
one of which filed the spam complaint on Welcome 1. They inflate the list
and drag Welcome open rates (21% this week vs 50% at launch). (3) Welcome 1
spam rate 7% on 14 sends trips the 0.3% threshold, but it is one complaint
from a bot-like signup. Zero-orders alert from Oct 12 is cleared.

Trigger check: Viewed Product events 0 since Oct 1, so no browse
abandonment yet. Post-purchase recipients 7 lifetime (needs 25). Delivered
orders 7 (needs 20 for review request). Customers 7 (needs 30 for win-back).
Unengaged 180 empty. Re-engagement send to WordPress non-openers: due before
Nov 5, so built this week.

Built as Draft: campaign `01M5A3F98DN7KE81Z2B8SA80NM` "Should we keep
writing?" to `VDMmfw` (80), master template `VGRdC7`, send time pre-set
Thu Oct 29, 10 am ET, not scheduled. Logged in `KLAVIYO.md`.

Recommendations to Adam: click the back-populate; approve the Oct 29
re-engagement send; let me add bot protection to the site signup form
(honeypot field plus a minimum time-to-submit, no third-party keys);
approve suppressing the 9 bot-pattern signups so they stop skewing numbers;
retailer order-by dates for Thanksgiving and Holidays.

Oct 19, follow-up after Adam said yes to all three:
- Re-engagement campaign `01M5A3F98DN7KE81Z2B8SA80NM` sent to Klaviyo's
  scheduler for Thu Oct 29, 10 am ET.
- 13 bot-pattern signups suppressed (job `01M5A624VKZBF5JEF223MZB5P0`, 12
  done, 1 skipped as already out): six dotted-Gmail and random-suffix
  addresses from this week, seven from Oct 2 to 11. Two more from the same
  pattern had already unsubscribed or complained and were left alone.
- Site: `js/signup.js` now drops a signup quietly when the honeypot is
  filled, the form is submitted under 3 seconds after the script loads, or
  a Gmail address has three or more dots in the local part. The homepage and
  cocktails honeypot inputs got `tabindex="-1" autocomplete="off"` so a
  browser never autofills them. The modal already had that.
- Still open: Adam's UI back-populate click for Behind the Bar; the first
  delay stays at 2 days until he confirms.

Oct 19, 9:40 am ET: Adam clicked "Add past profiles" (At the beginning) on
Behind the Bar. First delay restored to 14 days at 9:41 am ET. The ~465
pre-launch subscribers should receive recipe 01 on Wed Oct 21 at 10 am
local; a check is scheduled for Oct 21, 4:30 pm ET to confirm the count.

Oct 21, 4:30 pm ET: the scheduled check of the Oct 21 recipe 01 send could
not run; the Klaviyo connector in this session needs re-authorization.
Retry set for Oct 22, 1 pm ET, which also covers the Añejo campaign send.

Oct 21, 4:35 pm ET (Klaviyo reconnected): recipe 01 went to only 1 person
today, not the ~465 expected. No skipped sends. Klaviyo's help says
profiles already Waiting in a delay keep their original schedule, so the
likely cause is that the "Add past profiles" job finished after the delay
was put back to 14 days (restored one minute after Adam said done, too
soon). If so the group is Waiting until Mon Nov 2, 10 am local. The other
possibility is that the click did not take. Adam asked to read the Waiting
count on the recipe 01 card. Lesson for next time: leave a shortened delay
in place for a few hours after a past-profiles job, then restore. Añejo
still Scheduled Oct 22, 10 am ET.

Oct 22, 1 pm ET: Añejo "The slow one." sent 10 am ET to 542 (list minus
VDMmfw). Three hours in: 533 delivered (98.3%), 156 unique opens (29%),
14 clicks (2.6%), 1 order $186.72, 4 unsubscribes (0.7%), 9 bounces
(1.7%), 0 spam. All inside thresholds. Behind the Bar recipe 01: still no
back-populated sends on Oct 21 or 22; waiting on Adam's read of the
Waiting count on the recipe 01 card (either ~465 waiting until Nov 2, or
the click did not take).

Oct 23 (Adam asked for a status): Añejo after a full day: 542 sent, 98%
delivered, 53% open, 3.8% click, 3 orders $529.50, 6 unsubscribes (1.1%),
0 spam. Orders Mon to Fri so far: 6, $870. Signups since the bot filter
went live Oct 19: 1 in four days (was 1 to 2 a day with bots mixed in);
watch that real signups are not being blocked. Behind the Bar recipe 01:
only normal new-signup sends, no back-populated batch yet; Adam has not yet
read the Waiting count. List 653. Re-engage Scheduled Oct 29, Gifts Nov 5,
Thanksgiving and Holidays still Draft.

## Thu Oct 23, 2026 (growth build, after Adam asked how to 10x online)

Built and pushed, details in `GROWTH.md`: Klaviyo onsite tracking with
Viewed Product on the product pages; Browse abandonment (`USbWpx`) and
Cross-sell 30 days (`TPrmZA`) as Draft flows; `recipes.html` lead-gen page
plus three Meta creatives in two sizes and the copy; `gifting.html` with a
quote form and The Trio as a Draft Shopify product at $199; a referral line
in all 26 Behind the Bar recipes. Routine prompt updated to track signups
by source, Viewed Product volume, and to nudge the two draft flows.
Waiting on Adam: set the two flows live, Meta pixel ID and budget, retailer
confirmation for the Trio, retailer order-by dates, marketplace decision.

## Mon Oct 26, 2026 (routine run 3)

**Headline:** the Meta recipe ads went live Oct 24 and brought 59 new
subscribers in two and a half days (9 on Oct 24, 26 on Oct 25, 24 on Oct 26
by 8:30 am ET), all tagged `recipes:recipes-leadgen`, all with consent, a
normal US consumer domain mix (Gmail 39, Yahoo 5, AOL 5, Hotmail 4, Comcast,
Verizon, iCloud). No bot pattern. List 653 to 710.

| | This week (Oct 20 to 26) | Last week (Oct 13 to 19) |
|---|---|---|
| Orders / revenue (Placed Order) | 7 / $998.78 | 3 / $476.41 |
| List signups | 59 (ads) + 4 other | 6 |
| List size | 710 | 653 |
| Email subscribers (all) S2hYpZ | 679 | ~640 |
| Opened since Oct 1 VeuGeB | 443 | |
| Unengaged 90 / 180 | 0 / 0 | 0 / 0 |
| Sending domain | active | active |

Campaigns: Añejo (Oct 22) final: 543 sent, 98.2% delivered, 55% open,
3.8% click, 3 orders $529.50, 6 unsubscribes (1.1%, just over threshold),
0 spam. Re-engage Scheduled Oct 29 10 am ET. Gifts Scheduled Nov 5.
Thanksgiving (Nov 12) and Holidays (Dec 10) still Draft, no order-by dates.

Flows, last 7 days: Welcome 1 59 recipients (the ad cohort), 98.3%
delivered, 27.6% open, 5.2% click, 0 orders. Welcome 2: 2. Welcome 3: 4,
with 1 spam complaint. Behind the Bar 01: 4 (normal new-signup sends; the
back-populated group still has not sent, Adam has not read the Waiting
count). Abandoned checkout: 3. Browse abandonment and Cross-sell (live Oct
23): no sends yet. Flows last 30 days: Welcome 629 recipients, 46% open,
2.6% click, 5 spam complaints (0.8%), 8 unsubscribes; Behind the Bar 01 169
recipients, 41% open, 1.2% click.

Unsubscribes since Oct 19: 7, none attributed to a message by the metric
(the Añejo report accounts for 6). Spam since Oct 19: 1, on Welcome 3.

**Problems flagged:**
- Welcome flow spam complaints over threshold on a 30-day view: Welcome 1
  3 of 257 (1.2%), Welcome 3 2 of 179 (1.1%). Small numbers, and the Oct 19
  bots account for some, but the new ad cohort is cold traffic and Welcome 1
  open rate on it is 28% against 43% before. Watch next week; if the ad
  cohort complains, Welcome 1 needs to say "the recipes you asked for" up top.
- Viewed Product (Wv5C5B): zero events all week. Klaviyo only records
  onsite events for identified visitors, and until the ads there were few
  of those. With 59 identified people now, product views should start
  appearing; if still zero next week, the tracking script needs a look.
  Browse abandonment cannot fire until it does.
- Añejo unsubscribe rate 1.1% (6 of 543), marginally over 1%.
- Meta reporting still blocked: no Network secret for graph.facebook.com,
  host not allowed, no ad account id. Cost per subscriber cannot be computed.
  If the full $40 a day was spent, 59 subscribers on roughly $100 of spend
  is about $1.70 each, far under the $4 target.

**Recommendations put to Adam:** (1) shorten the Behind the Bar first delay
so ad subscribers get the Paloma the day after they sign up (the ads
promise it; today they wait 14 days); (2) add the Meta secret, allowed
domain and ad account id; (3) get Bevstack's order-by dates and Trio answer
on today's 11 am call, so Thanksgiving can be scheduled; (4) rename the two
live flows to drop "(DRAFT)" from their names in the Klaviyo UI.

Nothing new built as draft this week. Review-request flow still waits for
20+ delivered orders (about 17 orders since launch).
