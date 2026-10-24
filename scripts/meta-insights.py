#!/usr/bin/env python3
"""Print last-N-days Meta Ads results for the De Nada account, per campaign and per ad.

The access token is never in this script or the environment. The cloud
environment's Network secret for graph.facebook.com adds
"Authorization: Bearer <token>" to every request on the way out.

The ad account id comes from META_AD_ACCOUNT_ID if set, else DEFAULT_ACCOUNT
below (with or without the "act_" prefix).

Usage: python3 scripts/meta-insights.py [days]   (default 7)
Needs graph.facebook.com allowed in the environment's network settings.
"""
import json, os, sys, urllib.error, urllib.parse, urllib.request

DEFAULT_ACCOUNT = ""  # Adam's ad account id, e.g. 1234567890
ACCT = os.environ.get("META_AD_ACCOUNT_ID") or DEFAULT_ACCOUNT
if not ACCT:
    sys.exit("No Meta ad account id (META_AD_ACCOUNT_ID or DEFAULT_ACCOUNT); skipping Meta.")
if not ACCT.startswith("act_"):
    ACCT = "act_" + ACCT
DAYS = int(sys.argv[1]) if len(sys.argv) > 1 else 7
API = "https://graph.facebook.com/v21.0"


def get(path, **params):
    url = f"{API}/{path}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)


def actions(row, kind):
    for a in row.get("actions", []) or []:
        if a.get("action_type") == kind:
            return float(a.get("value", 0))
    return 0.0


def report(level):
    fields = "campaign_name,adset_name,ad_name,spend,impressions,reach,clicks,inline_link_clicks,actions,cpm,ctr"
    data = get(f"{ACCT}/insights", level=level, fields=fields,
               date_preset=f"last_{DAYS}d" if DAYS in (3, 7, 14, 28, 30, 90) else "last_7d",
               limit=100).get("data", [])
    rows = []
    for r in data:
        spend = float(r.get("spend", 0))
        leads = actions(r, "lead") or actions(r, "offsite_conversion.fb_pixel_lead")
        link = float(r.get("inline_link_clicks", 0) or 0)
        rows.append({
            "name": r.get("ad_name") or r.get("adset_name") or r.get("campaign_name"),
            "spend": spend, "impr": int(r.get("impressions", 0)), "link_clicks": int(link),
            "leads": int(leads), "cpl": (spend / leads) if leads else None,
            "cpc": (spend / link) if link else None, "ctr": float(r.get("ctr", 0) or 0),
        })
    return rows


def show(title, rows):
    print(f"\n{title} (last {DAYS} days)")
    print(f"{'name':28} {'spend':>8} {'impr':>8} {'clicks':>7} {'leads':>6} {'CPL':>7} {'CPC':>6} {'CTR%':>6}")
    for r in rows:
        cpl = f"${r['cpl']:.2f}" if r["cpl"] else "-"
        cpc = f"${r['cpc']:.2f}" if r["cpc"] else "-"
        print(f"{r['name'][:28]:28} ${r['spend']:>7.2f} {r['impr']:>8} {r['link_clicks']:>7} {r['leads']:>6} {cpl:>7} {cpc:>6} {r['ctr']:>6.2f}")
    if not rows:
        print("no delivery in this window")


try:
    status = get(f"{ACCT}/campaigns", fields="name,effective_status", limit=50).get("data", [])
    print("Campaigns:", ", ".join(f"{c['name']} [{c['effective_status']}]" for c in status) or "none")
    show("By campaign", report("campaign"))
    show("By ad", report("ad"))
except urllib.error.HTTPError as e:
    body = e.read().decode()[:400]
    if e.code in (401, 400) and "access token" in body.lower():
        sys.exit("Meta refused the token: the graph.facebook.com Network secret is missing, expired or lacks ads_read. " + body)
    if e.code in (403, 407):
        sys.exit("graph.facebook.com is blocked by the environment's network policy; add it under Allowed domains.")
    sys.exit(f"Meta API error {e.code}: {body}")
except urllib.error.URLError as e:
    sys.exit(f"Could not reach graph.facebook.com ({e.reason}); check the environment's network settings.")
