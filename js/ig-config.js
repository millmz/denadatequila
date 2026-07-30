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

   The renderer (js/instagram.js) also understands raw Instagram Graph API
   responses, so a self-hosted token setup works here too if the team ever
   prefers that. Either way, this URL is the only thing to edit.
   ============================================================================ */

window.DENADA_IG = {
  /* Paste the JSON feed URL here. Empty = carousel stays hidden. */
  feedUrl: "",

  /* Shown in the section heading and the Follow button. */
  handle: "@denadatequila",
  profileUrl: "https://www.instagram.com/denadatequila/",

  /* Maximum posts to show in the carousel. */
  limit: 12
};
