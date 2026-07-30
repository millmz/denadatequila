/* ============================================================================
   Scheduled function: refreshes the Instagram long-lived token every Monday.

   Instagram tokens last 60 days and refreshing restarts the clock, so a
   weekly cadence leaves ~8 missed runs of slack before anything expires.
   The refreshed token is persisted in Netlify Blobs; the IG_ACCESS_TOKEN
   environment variable is only the initial seed.
   ============================================================================ */
import { store, readToken, refreshToken } from "../lib/ig.mjs";

export default async function handler() {
  const blobs = await store();
  const tok = await readToken(blobs);
  if (!tok) {
    console.error("instagram-refresh: no token configured (set IG_ACCESS_TOKEN)");
    return new Response("no token", { status: 200 });
  }
  const result = await refreshToken(blobs, tok);
  console.log(result.refreshed
    ? "instagram-refresh: token refreshed and stored"
    : "instagram-refresh: refresh FAILED, keeping previous token");
  return new Response(result.refreshed ? "refreshed" : "refresh failed", { status: 200 });
}

export const config = { schedule: "@weekly" };
