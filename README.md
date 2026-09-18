# teaser branch

A single holding page shown on denadatequila.com until the site launches on
October 1st. Not part of the real site; `main` is untouched.

- Same wordmark, palette, age gate and analytics as the site.
- Signup posts to the same Netlify form (`rsvp`) as the real homepage, with a
  hidden `source=teaser` field so you can tell them apart.
- "Shop the Originals" links to the Shopify store, which keeps running.
- `_redirects`: QR codes (`/w/b`, `/w/r`, `/w/a`) keep their attribution; every
  other path 302s to `/`.

## How it goes live, and how it comes down

In Netlify: this branch is deployed as a branch deploy, that deploy is
**published** to production, and the site is **locked** so later `main`
deploys build but do not publish. Launch = **unlock** ("Start auto publishing"),
which publishes the latest `main` deploy immediately. No DNS involved.
