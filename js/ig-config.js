/* ============================================================================
   DE NADA TEQUILA — INSTAGRAM FEED CONFIG
   ----------------------------------------------------------------------------
   The homepage carousel stays hidden until `feedUrl` below is filled in, so
   nothing on the site looks broken while this is being set up.

   WHY A FEED URL IS NEEDED
   ------------------------
   Instagram does not allow websites to read a profile's posts directly:
   feeds require an API access token that expires and must be refreshed,
   which a static site cannot do on its own. The simplest reliable setup is
   a feed service that owns that problem and serves the posts as JSON.

   SETUP (about 10 minutes, once) — see INSTAGRAM-SETUP.md for details
   -------------------------------------------------------------------
   1. Create a free account at https://behold.so (or any service that turns
      an Instagram account into a JSON feed — Behold's free tier is enough).
   2. Connect the @denadatequila Instagram account and create a JSON feed.
   3. Paste the feed URL it gives you below, commit, deploy. Done — the
      carousel appears and stays in sync with the account automatically.

   This site is set up for the SELF-HOSTED route: /api/instagram below is a
   Netlify function in this repo that talks to the Instagram API directly and
   refreshes its own token automatically (see INSTAGRAM-SETUP.md). To go live,
   set the IG_ACCESS_TOKEN environment variable in Netlify — no edit needed
   here. To use a feed service like Behold instead, replace the URL below
   with the service's feed URL.
   ============================================================================ */

window.DENADA_IG = {
  /* The feed endpoint. Until IG_ACCESS_TOKEN is configured in Netlify this
     returns an error and the carousel stays hidden, which is safe. */
  feedUrl: "/api/instagram",

  /* Shown in the section heading and the Follow button. */
  handle: "@denadatequila",
  profileUrl: "https://www.instagram.com/denadatequila/",

  /* Maximum posts to show in the carousel. */
  limit: 12
};
