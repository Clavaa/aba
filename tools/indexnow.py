#!/usr/bin/env python3
"""Push URLs to IndexNow (Bing, Yandex, Seznam, Naver — and DuckDuckGo via Bing).

    tools/indexnow.sh                 # everything in the sitemaps
    tools/indexnow.sh --geo           # only /locations/ pages
    tools/indexnow.sh --limit 500     # a slice, to test
    tools/indexnow.sh --dry-run

Google does not participate in IndexNow, so this does not speed up Google. It
widens reach OUTSIDE Google, which matters while Google's crawl of 13,400
pages is the constraint — Bing accounts for a meaningful share of search
traffic on the sibling site, and DuckDuckGo serves Bing's index.

URLs come from the site's own sitemap index, so this can never submit a URL
the site doesn't actually publish.
"""
import json
import re
import sys
import urllib.error
import urllib.request

HOST = "sproutwellaba.com"
ORIGIN = f"https://{HOST}"
ENDPOINT = "https://api.indexnow.org/IndexNow"
BATCH = 10_000  # IndexNow's documented per-request maximum

UA = "Mozilla/5.0 (compatible; sproutwellaba-indexnow/1.0)"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read().decode("utf-8", "replace")


def key() -> str:
    src = open("lib/indexnow.ts", encoding="utf-8").read()
    m = re.search(r'INDEXNOW_KEY = "([0-9a-f]+)"', src)
    if not m:
        sys.exit("could not read INDEXNOW_KEY from lib/indexnow.ts")
    return m.group(1)


def all_urls() -> list[str]:
    index = fetch(f"{ORIGIN}/sitemap-index.xml")
    maps = re.findall(r"<loc>([^<]+)</loc>", index)
    seen: list[str] = []
    for m in maps:
        try:
            body = fetch(m)
        except urllib.error.URLError as e:
            print(f"  ! could not read {m}: {e}", file=sys.stderr)
            continue
        found = re.findall(r"<loc>([^<]+)</loc>", body)
        seen.extend(found)
        print(f"  {len(found):>6} urls from {m.rsplit('/', 1)[-1]}")
    # Dedupe, keep order, and never submit a host we don't own.
    out, uniq = [], set()
    for u in seen:
        if u.startswith(ORIGIN) and u not in uniq:
            uniq.add(u)
            out.append(u)
    return out


def submit(urls: list[str], k: str, dry: bool) -> None:
    for i in range(0, len(urls), BATCH):
        chunk = urls[i : i + BATCH]
        payload = {
            "host": HOST,
            "key": k,
            "keyLocation": f"{ORIGIN}/{k}.txt",
            "urlList": chunk,
        }
        if dry:
            print(f"  [dry-run] would submit {len(chunk)} urls")
            continue
        req = urllib.request.Request(
            ENDPOINT,
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": UA},
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                print(f"  submitted {len(chunk)} urls → HTTP {r.status}")
        except urllib.error.HTTPError as e:
            # 422 usually means the key file isn't reachable yet.
            print(f"  submitted {len(chunk)} urls → HTTP {e.code} {e.reason}")
            body = e.read().decode("utf-8", "replace")[:300]
            if body:
                print(f"     {body}")


def main() -> int:
    args = sys.argv[1:]
    dry = "--dry-run" in args
    geo_only = "--geo" in args
    limit = None
    if "--limit" in args:
        limit = int(args[args.index("--limit") + 1])

    k = key()
    print(f"IndexNow key file: {ORIGIN}/{k}.txt")
    try:
        if fetch(f"{ORIGIN}/{k}.txt").strip() != k:
            print("  ! key file does not match — deploy before submitting", file=sys.stderr)
            return 1
        print("  key file verified")
    except urllib.error.URLError as e:
        print(f"  ! key file unreachable ({e}) — deploy before submitting", file=sys.stderr)
        return 1

    urls = all_urls()
    if geo_only:
        urls = [u for u in urls if "/locations/" in u]
    if limit:
        urls = urls[:limit]
    print(f"\n{len(urls)} urls to submit")
    submit(urls, k, dry)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
