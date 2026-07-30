# Instagram Carousel — Setup

The homepage has a "Proof of good hosting" carousel wired to the Instagram
feed. It is **hidden until connected**, so the site looks unchanged until this
one-time setup is done. Connecting it is pasting a single URL.

---

## Why a URL is needed at all

Instagram does not let websites read a profile's posts directly. Feeds require
an API access token that **expires and must be refreshed on a schedule**, which
a static Netlify site cannot do by itself. (Meta also retired the old Basic
Display API in December 2024, which killed most DIY embed snippets.)

The practical fix: a small feed service owns the token problem and republishes
the account's posts as a stable JSON URL. The site fetches that URL in the
browser and renders the carousel. Posts stay in sync with the account
automatically.

---

## Setup (~10 minutes, once)

1. Go to **https://behold.so** and create a free account.
   (Any equivalent service that outputs an Instagram JSON feed works the same —
   Behold's free tier covers one feed, which is all this needs.)
2. **Connect the @denadatequila Instagram account** when prompted.
3. Create a feed, choose **JSON** as the output.
4. Copy the feed URL it gives you.
5. Open **`js/ig-config.js`** and paste it:

   ```js
   feedUrl: "https://feeds.behold.so/XXXXXXXXXXXX",
   ```

6. Commit and deploy. The carousel appears on the homepage between the
   "Quiet Craft" band and "The Guest List" signup.

---

## Behavior

- **Not configured / feed down / network error** → the section stays hidden.
  The page never shows a broken or empty band.
- Posts render newest-first as square tiles; each links to the post on
  Instagram in a new tab. Videos show their cover image.
- `limit` in `js/ig-config.js` caps how many posts show (default 12).
- Arrows page through on desktop; on mobile it is swipe-to-scroll.

## If the team ever wants to self-host instead

`js/instagram.js` also understands raw **Instagram Graph API** responses
(`{ data: [...] }`), so a Netlify scheduled function that refreshes a token
and caches the API response would drop in with no renderer changes. That
setup requires a Meta developer app, a Business/Creator Instagram account,
and token-refresh plumbing — the feed-service route above avoids all of it.

## Files

| File | Role |
|---|---|
| `js/ig-config.js` | **The only file to edit.** Feed URL, handle, post limit. |
| `js/instagram.js` | Fetches the feed and renders the carousel. |
| `index.html` | The carousel section (`#ig`), hidden until posts load. |
