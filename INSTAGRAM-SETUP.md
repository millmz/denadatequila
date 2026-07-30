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

### "Insufficient Developer Role" when generating the token

Seen as a redirect to
`instagram.com/oauth/authorize/third_party/error/?message=Insufficient%20Developer%20Role`.

The app is in Development mode, so only Instagram accounts holding a role on
the app may authorize it. Instagram's OAuth uses **whichever account is
currently logged into instagram.com in that browser** — so being signed in as
a personal account (or any account without a role) triggers this. In order:

1. **Fix the browser session.** Open an incognito window, sign in to
   instagram.com as **@denadatequila**, then restart token generation from the
   Meta dashboard. This is the usual cause: the Meta app is typically owned by
   a personal Facebook login while the Instagram account is the brand's.
2. **Grant the role.** Meta app dashboard → **App roles → Roles → Add People**
   → add the @denadatequila Instagram account (Admin or Developer).
3. **Accept the invite** — the commonly missed step. On Instagram as
   @denadatequila: **Settings → Apps and Websites → Tester Invites → Accept**.
   A sent-but-unaccepted invite throws this same error while the dashboard may
   still show the app as connected.
4. **Reset the connection.** On Instagram: Settings → Apps and Websites →
   Active → remove the app, then reconnect from the Meta dashboard. Use a
   desktop browser, not the phone app.

### Other issues

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
