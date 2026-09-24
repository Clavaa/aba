#!/usr/bin/env bash
# Push the sitemap to IndexNow. Usage: tools/indexnow.sh [--geo] [--limit N] [--dry-run]
set -euo pipefail
cd "$(dirname "$0")/.."
exec python3 tools/indexnow.py "$@"
