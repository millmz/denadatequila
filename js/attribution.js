/* ============================================================================
   DE NADA TEQUILA — VISITOR SOURCE
   ----------------------------------------------------------------------------
   Remembers the UTM tags a visitor arrived with (a Meta ad, an email, a truck
   QR code) for the rest of the tab session, so js/checkout.js can pass them on
   to Shopify and the order is credited to where the visitor really came from.

   A visitor with no tags (typed the address, found us on Google) gets none.
   The newest tags win, so a later click on an email replaces an earlier ad.
   ============================================================================ */
(function () {
  "use strict";

  var KEY = "denada_utm";
  var TAGS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"];

  function fromUrl() {
    var search = new URLSearchParams(window.location.search);
    var found = new URLSearchParams();
    TAGS.forEach(function (tag) {
      var value = search.get(tag);
      if (value) found.set(tag, value);
    });
    return found.toString();
  }

  // Storage can be blocked (private windows), so the tags on this page's own
  // URL still work without it.
  var current = fromUrl();
  try {
    if (current) window.sessionStorage.setItem(KEY, current);
    else current = window.sessionStorage.getItem(KEY) || "";
  } catch (e) { /* keep what the URL gave us */ }

  window.DenadaAttribution = {
    query: function () { return current; }
  };
})();
