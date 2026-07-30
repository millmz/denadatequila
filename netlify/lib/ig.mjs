/* ============================================================================
   Shared Instagram helpers for the Netlify functions.

   Token model: Instagram long-lived tokens last 60 days and can be refreshed
   any time after they are 24 hours old; refreshing restarts the 60-day clock.
   The current token lives in Netlify Blobs so a refresh survives deploys and
   function cold starts. The IG_ACCESS_TOKEN environment variable is only the
   seed: it gets the system started and is a fallback if Blobs is unavailable.
   ============================================================================ */

const GRAPH = "https://graph.instagram.com";

/* Netlify Blobs, loaded dynamically so local test runs (and any environment
   without Blobs) degrade to env-token-only behavior instead of crashing. */
export async function store() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore("instagram");
  } catch {
    return null;
  }
}

/* Current token + when it was last refreshed. */
export async function readToken(blobs) {
  if (blobs) {
    try {
      const saved = await blobs.get("token", { type: "json" });
      if (saved && saved.token) return saved;
    } catch {}
  }
  const seed = (process.env.IG_ACCESS_TOKEN || "").trim();
  return seed ? { token: seed, refreshedAt: 0 } : null;
}

/* Refresh the long-lived token and persist the new one. Returns the token to
   keep using (the new one on success, the old one otherwise). */
export async function refreshToken(blobs, current) {
  try {
    const r = await fetch(
      `${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(current.token)}`
    );
    if (!r.ok) throw new Error(`refresh HTTP ${r.status}`);
    const json = await r.json();
    if (!json.access_token) throw new Error("refresh: no access_token");
    const next = { token: json.access_token, refreshedAt: Date.now() };
    if (blobs) {
      try { await blobs.setJSON("token", next); } catch {}
    }
    return { ...next, refreshed: true };
  } catch (err) {
    console.error("instagram token refresh failed:", err.message);
    return { ...current, refreshed: false };
  }
}

/* Fetch recent posts. Returns the raw Graph-API-shaped object { data: [...] }
   that the site's renderer already understands. */
export async function fetchPosts(token, limit = 24) {
  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const r = await fetch(
    `${GRAPH}/me/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`
  );
  if (!r.ok) throw new Error(`media HTTP ${r.status}`);
  const json = await r.json();
  if (!Array.isArray(json.data)) throw new Error("media: unexpected shape");
  return { data: json.data };
}
