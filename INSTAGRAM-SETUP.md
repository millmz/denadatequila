# Instagram Carousel — Setup

The homepage has a "Proof of good hosting" carousel wired to the Instagram
feed. It stays **hidden until connected**, so the site looks unchanged until
setup is done.

The site is pre-wired for the **self-hosted route**: the feed comes from this
repo's own Netlify functions, which talk to Instagram's API directly and
**refresh the API token automatically, forever**. No third-party service, no
subscription. Going live requires exactly one thing: putting an Instagram
access token into Netlify.

---

## How it works

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

- Instagram tokens last **60 days**; each refresh restarts the clock. A weekly
  schedule plus the 7-day lazy fallback means the token effectively never dies.
- The refreshed token lives in **Netlify Blobs** (key-value storage included
  in Netlify), so it survives deploys. The environment variable is only the
  seed that starts the system.
- Feed responses are **cached for 45 minutes**, so Instagram sees ~32 calls a
  day no matter the traffic. If Instagram is down, the last good feed is
  served; if nothing works, the carousel hides rather than looking broken.

---

## One-time setup (~30 minutes)

### 1. Get an Instagram access token

Requirements: the @denadatequila Instagram account must be a **Professional
account** (Business or Creator — Settings → Account type in the app).

1. Go to **https://developers.facebook.com** and log in.
2. **Create App** → use case: **Other** → type: **Business**.
3. In the app dashboard, **Add product → Instagram**, choose
   **"API setup with Instagram business login"**.
4. Under **Generate access tokens**, add the @denadatequila account and log
   in with its credentials when prompted.
5. Click **Generate token** next to the account and copy it (a long string).
   This is a 60-day long-lived token — the site takes care of it from here.

### 2. Put the token in Netlify

1. Netlify → the denadatequila site → **Site configuration →
   Environment variables → Add a variable**.
2. Key: `IG_ACCESS_TOKEN` — Value: the token from step 1.
3. **Trigger a deploy** (Deploys → Trigger deploy) so functions pick it up.

That's it. The carousel appears on the homepage once `/api/instagram` starts
returning posts, and the token now refreshes itself weekly.

### 3. Verify (optional but recommended)

- Open `https://www.denadatequila.com/api/instagram` — should return JSON
  starting with `{"data":[{...`.
- Load the homepage — the carousel appears between Quiet Craft and the
  Guest List signup.
- Netlify → **Logs → Functions** shows `instagram-feed` runs, and
  `instagram-refresh` appears each Monday.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `/api/instagram` returns `{"error":"not configured"}` | Env var missing or deploy predates it | Set `IG_ACCESS_TOKEN`, redeploy |
| Worked, then died weeks later | Token invalidated (account password change, security checkpoint, or >60 days with functions failing) | Generate a fresh token (step 1.5), update the env var, redeploy |
| Carousel hidden but `/api/instagram` returns posts | Browser cached an old failure | Hard refresh; it self-heals |

Note: changing the Instagram account's password, or Meta flagging the account,
invalidates the token. The fix is always the same two minutes: regenerate the
token in the Meta app dashboard and update `IG_ACCESS_TOKEN`.

---

## Alternative: feed service (no Meta app)

If the team ever prefers not to own a Meta developer app, a service like
**behold.so** (free tier) does the same job: connect the Instagram account
there, then set `feedUrl` in `js/ig-config.js` to the JSON URL it provides.
The renderer accepts both formats. The functions can be left in place; unused,
they cost nothing.

---

## Files

| File | Role |
|---|---|
| `netlify/functions/instagram-feed.mjs` | Serves `/api/instagram` (cached feed, lazy token refresh) |
| `netlify/functions/instagram-refresh.mjs` | Weekly scheduled token refresh |
| `netlify/lib/ig.mjs` | Shared Instagram API + Blobs helpers |
| `netlify.toml` | Declares the functions directory |
| `js/ig-config.js` | Points the carousel at `/api/instagram` |
| `js/instagram.js` | Fetches the feed and renders the carousel |
| `index.html` | The carousel section (`#ig`), hidden until posts load |
