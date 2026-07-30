/* ============================================================================
   GET /api/instagram — serves the Instagram feed to the homepage carousel.

   - Responses are cached in Netlify Blobs for 45 minutes, so Instagram sees
     at most ~32 API calls a day regardless of site traffic.
   - If Instagram is down or the token is bad, the last good cache is served
     (stale is better than broken); with no cache at all it returns 502 and
     the carousel simply stays hidden.
   - Safety net: if the weekly scheduled refresh ever stops running, this
     function refreshes the token itself once it is older than 7 days.
   ============================================================================ */
import { store, readToken, refreshToken, fetchPosts } from "../lib/ig.mjs";

const CACHE_TTL_MS = 45 * 60 * 1000;
const LAZY_REFRESH_MS = 7 * 24 * 60 * 60 * 1000;

export default async function handler() {
  const blobs = await store();

  // fresh cache? serve it
  let cached = null;
  if (blobs) {
    try { cached = await blobs.get("feed-cache", { type: "json" }); } catch {}
  }
  if (cached && Date.now() - cached.t < CACHE_TTL_MS) {
    return respond(cached.body, "hit");
  }

  const tok = await readToken(blobs);
  if (!tok) {
    return cached ? respond(cached.body, "stale-no-token")
                  : new Response(JSON.stringify({ error: "not configured" }), { status: 502, headers: HEADERS });
  }

  // token getting old and the scheduled refresh hasn't touched it? refresh now
  let current = tok;
  if (tok.refreshedAt && Date.now() - tok.refreshedAt > LAZY_REFRESH_MS) {
    current = await refreshToken(blobs, tok);
  }

  try {
    const body = await fetchPosts(current.token);
    if (blobs) {
      try { await blobs.setJSON("feed-cache", { t: Date.now(), body }); } catch {}
    }
    return respond(body, "miss");
  } catch (err) {
    console.error("instagram feed fetch failed:", err.message);
    return cached ? respond(cached.body, "stale-error")
                  : new Response(JSON.stringify({ error: "unavailable" }), { status: 502, headers: HEADERS });
  }
}

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=900, stale-while-revalidate=3600",
  "Access-Control-Allow-Origin": "*"
};

function respond(body, cacheState) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { ...HEADERS, "X-Feed-Cache": cacheState }
  });
}

export const config = { path: "/api/instagram" };
