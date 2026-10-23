/* ============================================================================
   DE NADA TEQUILA — MAILING LIST CONFIG
   ----------------------------------------------------------------------------
   Where signups go. Both site forms (homepage Guest List, teaser page) read
   this file. Until it is filled in, signups fall back to Netlify Forms
   (Netlify > Forms > rsvp), so nothing is ever lost.

   SETUP (Klaviyo, ~5 minutes)
     1. Klaviyo > Settings > Account > API keys. Copy the PUBLIC key
        (6 characters, e.g. "AbC123"). It is safe in a web page; it can only
        add subscribers, never read them.
     2. Klaviyo > Lists & Segments > your list > Settings. Copy the List ID
        (6 characters, e.g. "XyZ789").
     3. Paste both below. Deploy. Done — every signup now lands in Klaviyo,
        tagged with where it came from, and Netlify keeps a backup copy.
   ============================================================================ */
window.DENADA_LIST = {
  klaviyoCompanyId: "UvBtKg",   // PUBLIC API key
  klaviyoListId: "WXrq3N",  // List ID

  /* Meta (Facebook/Instagram) pixel ID for the recipes landing page ads.
     Meta Events Manager > Data sources > the pixel > the 15-16 digit ID.
     Leave "" until the ad account exists; nothing loads while it is empty. */
  metaPixelId: "3958712751050131"   // "De Nada Tequila Pixel", added Oct 23 2026
};
