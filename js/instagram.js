/* ============================================================================
   DE NADA TEQUILA — INSTAGRAM CAROUSEL
   ----------------------------------------------------------------------------
   Reads js/ig-config.js. Fetches the configured JSON feed, renders the posts
   into the homepage carousel, and only then reveals the section. If no feed
   is configured, or the fetch fails, the section simply never appears —
   the page never shows a broken or empty band.

   Accepted feed shapes (checked in this order):
     - Behold:            { posts: [ ... ] }   or a bare array [ ... ]
     - Instagram Graph:   { data:  [ ... ] }
   Accepted per-post fields:
     link:  permalink | url
     image: mediaUrl | media_url | thumbnailUrl | thumbnail_url
            (videos use their thumbnail; carousels use their cover image)
     text:  caption | prunedCaption (used for alt text, truncated)
   ============================================================================ */
(function () {
  "use strict";

  var CFG = window.DENADA_IG || {};

  /* Pick the best image for a square tile.
     Feed services expose pre-resized copies under `sizes`; preferring those
     over the full-resolution `mediaUrl` keeps a 12-tile carousel light.
     Videos have no still of their own, so use their cover thumbnail. */
  function pickImage(p) {
    var sizes = p.sizes || {};
    var resized = (sizes.medium && sizes.medium.mediaUrl) ||
                  (sizes.small && sizes.small.mediaUrl) ||
                  (sizes.large && sizes.large.mediaUrl) || "";
    var full = p.mediaUrl || p.media_url || "";
    var thumb = p.thumbnailUrl || p.thumbnail_url || "";
    var type = String(p.mediaType || p.media_type || "").toUpperCase();
    if (type === "VIDEO") return thumb || resized || full;
    return resized || full || thumb;
  }

  function normalize(json) {
    var list = Array.isArray(json) ? json
             : (json && Array.isArray(json.posts)) ? json.posts
             : (json && Array.isArray(json.data)) ? json.data
             : [];
    var posts = [];
    for (var i = 0; i < list.length; i++) {
      var p = list[i] || {};
      var img = pickImage(p);
      var link = p.permalink || p.url || "";
      if (!img || !link) continue;
      var cap = (p.prunedCaption || p.caption || "").replace(/\s+/g, " ").trim();
      if (cap.length > 120) cap = cap.slice(0, 117) + "...";
      posts.push({ img: img, link: link, cap: cap });
    }
    return posts;
  }

  function render(posts) {
    var section = document.getElementById("ig");
    var track = document.getElementById("ig-track");
    if (!section || !track || !posts.length) return;

    var max = CFG.limit > 0 ? CFG.limit : 12;
    var frag = document.createDocumentFragment();
    posts.slice(0, max).forEach(function (p) {
      var a = document.createElement("a");
      a.className = "ig-tile";
      a.href = p.link;
      a.target = "_blank";
      a.rel = "noopener";
      var img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.src = p.img;
      img.alt = p.cap || "De Nada Tequila on Instagram";
      a.appendChild(img);
      frag.appendChild(a);
    });
    track.appendChild(frag);

    // arrows scroll one viewport of tiles at a time
    var prev = section.querySelector("[data-ig-prev]");
    var next = section.querySelector("[data-ig-next]");
    function page(dir) {
      track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: "smooth" });
    }
    if (prev) prev.addEventListener("click", function () { page(-1); });
    if (next) next.addEventListener("click", function () { page(1); });

    section.hidden = false;
  }

  function init() {
    var url = (CFG.feedUrl || "").trim();
    if (!url) return; // not configured yet: section stays hidden
    fetch(url, { mode: "cors" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (json) { render(normalize(json)); })
      .catch(function () { /* leave the section hidden; never show a broken band */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
