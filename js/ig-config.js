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

   TO CONNECT THE CAROUSEL: set feedUrl below. Two ways to get that URL —
   full instructions in INSTAGRAM-SETUP.md.

     Option A (recommended, ~10 min, no Meta developer app):
       Create a free feed at behold.so, connect @denadatequila, and paste the
       JSON feed URL here, e.g.
         feedUrl: "https://feeds.behold.so/XXXXXXXXXXXX",

     Option B (self-hosted, no third party):
       Set IG_ACCESS_TOKEN in Netlify, then use this repo's own endpoint:
         feedUrl: "/api/instagram",
       The Netlify functions refresh the Instagram token automatically.

   Either way the renderer handles the response format. While feedUrl is
   empty the carousel simply stays hidden, so nothing looks broken.
   ============================================================================ */

window.DENADA_IG = {
  /* Paste the feed URL here (see above). Empty = carousel stays hidden. */
  feedUrl: "https://feeds.behold.so/ALOsU8ffQo6VCjLHEtZL",

  /* Shown in the section heading and the Follow button. */
  handle: "@denadatequila",
  profileUrl: "https://www.instagram.com/denadatequila/",

  /* Maximum posts to show in the carousel. */
  limit: 12,

  /* Shown instead of the live feed when it cannot be read: Behold's free
     plan pauses a feed for the rest of the month once it passes 1,200 views,
     and it only refreshes once a day. These are our own photos, linking to
     the profile, so the band never disappears. The subtitle changes so the
     page does not call them live posts. */
  fallbackSubtitle: "Pull up a chair.",
  fallback: [
    { img: "img/photos/tyler-trio-800.webp",       cap: "Blanco, Reposado and Añejo in the new glass bottles" },
    { img: "img/photos/tyler-pour-800.webp",       cap: "Pouring De Nada Reposado" },
    { img: "img/photos/founders-cheers-800.webp",  cap: "Danny and Adam, cheers" },
    { img: "img/photos/tyler-blanco-800.webp",     cap: "De Nada Blanco" },
    { img: "img/photos/paloma-pour-800.webp",      cap: "A paloma in the making" },
    { img: "img/photos/tyler-reposado-800.webp",   cap: "De Nada Reposado" },
    { img: "img/photos/rocks-glass-800.webp",      cap: "Añejo, neat" },
    { img: "img/photos/tyler-anejo-800.webp",      cap: "De Nada Añejo" }
  ]
};
