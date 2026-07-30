# Instagram Carousel — Setup

The homepage has a "Proof of good hosting" carousel wired to the Instagram
feed. It stays **hidden until connected**, so the site looks unchanged until
setup is done.

There are two ways to connect it. **Option A is the recommended one** — it
takes about 10 minutes and never touches the Meta developer dashboard.

---

## Option A — Feed service (recommended, ~10 minutes)

A feed service connects to Instagram, handles the API token forever, and
republishes the posts as a plain JSON URL. The site reads that URL.

1. Go to **https://behold.so** and create a free account.
   (Free tier covers one feed, which is all this needs. SnapWidget,
   LightWidget, and EmbedSocial work the same way if you prefer one of those.)
2. **Connect the @denadatequila Instagram account** when prompted.
   The account must be a Professional account (Business or Creator) — set in
   the Instagram app under Settings → Account type.
3. Create a feed and choose **JSON** as the output format.
4. Copy the feed URL it gives you.
5. Open **`js/ig-config.js`** and set `feedUrl` to that URL:

   ```js
   feedUrl: "https://feeds.behold.so/XXXXXXXXXXXX",
   ```

6. Commit and deploy. The carousel appears between the "Quiet Craft" band
   and "The Guest List" signup, and stays in sync with the account
   automatically.

**Why this is recommended:** Instagram's own API requires a Meta developer
app, a token, and correct developer roles on the Instagram account. That
permission chain is where most setups stall — especially for brand accounts
that live inside a Business portfolio. A feed service skips all of it.

---

## Option B — Self-hosted (no third party, ~30 minutes if Meta cooperates)

The repo already contains everything for this route: Netlify functions that
call Instagram's API directly and refresh the token automatically, forever.
Nothing to build — it only needs a token.

```
Instagram Graph API
   ▲            ▲
   │            └── instagram-refresh (scheduled, weekly)
   │                refreshes the 60-day token, stores it in Netlify Blobs
   │
/api/instagram  ── instagram-feed function
   ▲               serves posts, cached 45 min; if the weekly refresh ever
   │               stops running, it refreshes the token itself after 7 days
homepage carousel
```

### Getting the token

Do this in an **incognito window**, so Instagram authorizes as the brand
account rather than whichever account the everyday browser is signed into.

1. **https://developers.facebook.com** → **My Apps** → your app.
2. Left sidebar: **Instagram** → **API setup with Instagram business login**.
3. Under **Generate access tokens**, click **Add account**. Instagram's login
   opens: sign in as **@denadatequila** and click **Allow**.
4. Click **Generate token** and copy it immediately — **Meta will not show it
   again**.
5. Netlify → **Site configuration → Environment variables** → add
   `IG_ACCESS_TOKEN` with that value.
6. Set `feedUrl: "/api/instagram"` in `js/ig-config.js`, then trigger a deploy.

The token refreshes itself weekly from then on. Instagram tokens last 60 days
and each refresh restarts the clock, so it effectively never expires.

> **Not the same thing:** Business Manager → *Add people and set permissions*
> assigns **advertising** permissions for an app ("measure app-related ad
> performance, manage campaigns…"). It does not grant API access, and adding
> the Instagram account there will not produce a token.

### If OAuth fails with "Insufficient Developer Role"

Seen as a redirect to
`instagram.com/oauth/authorize/third_party/error/?message=Insufficient%20Developer%20Role`.

The app is in Development mode, so only Instagram accounts holding a role on
the app may authorize it, and Instagram authorizes as whichever account the
browser is signed into. In order:

1. **Fix the browser session** — incognito, signed in as @denadatequila.
2. **Grant the role** — App Dashboard → **App roles → Roles → Add People**.
3. **Accept the invite** (commonly missed) — on Instagram as @denadatequila:
   **Settings → Apps and Websites → Tester Invites → Accept**.
4. **Reset the connection** — Instagram → Settings → Apps and Websites →
   Active → remove the app, then reconnect. Desktop browser, not the phone.

If it still fails after those, **use Option A**. Brand accounts inside a
Business portfolio can have permission chains that are genuinely not worth
untangling for a photo carousel.

---

## Behavior (either option)

- **Not configured / feed down / network error** → the section stays hidden.
  The page never shows a broken or empty band.
- Posts render newest-first as square tiles, each linking to the post on
  Instagram. Videos show their cover image.
- `limit` in `js/ig-config.js` caps how many posts show (default 12).
- Arrows page through on desktop; mobile is swipe-to-scroll.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Carousel never appears | `feedUrl` empty, or the feed URL 404s | Check `js/ig-config.js`; open the feed URL directly in a browser |
| `/api/instagram` returns `{"error":"not configured"}` | Option B: env var missing, or deploy predates it | Set `IG_ACCESS_TOKEN`, redeploy |
| Worked, then died weeks later | Option B: token invalidated (password change or security checkpoint) | Regenerate the token, update the env var, redeploy |
| Carousel hidden but the feed URL returns posts | Browser cached an old failure | Hard refresh; it self-heals |

## Files

| File | Role |
|---|---|
| `js/ig-config.js` | **The only file to edit.** Feed URL, handle, post limit. |
| `js/instagram.js` | Fetches the feed and renders the carousel. Accepts feed-service and raw Graph API formats. |
| `index.html` | The carousel section (`#ig`), hidden until posts load. |
| `netlify/functions/instagram-feed.mjs` | Option B: serves `/api/instagram` |
| `netlify/functions/instagram-refresh.mjs` | Option B: weekly token refresh |
| `netlify/lib/ig.mjs` | Option B: shared Instagram API + Blobs helpers |

The Option B functions are harmless if unused — they only run when called, so
leaving them in place while using Option A costs nothing.
