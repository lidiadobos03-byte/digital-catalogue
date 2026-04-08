#!/bin/zsh

cd "$(dirname "$0")" || exit 1

PORT=8000

python3 -m http.server "$PORT" >/tmp/aevum-local-preview.log 2>&1 &
SERVER_PID=$!

sleep 1
open "http://localhost:${PORT}/index.html"

echo "AEVUM local preview is running at http://localhost:${PORT}/index.html"
echo "Press Enter to stop the local server."
read

kill "$SERVER_PID" 2>/dev/null
