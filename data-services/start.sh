#!/bin/sh
set -e

echo "Installing Python..."
apk add --no-cache python3 py3-requests

echo "Starting data generator (gen_data_default.py)..."
# Run your Python script in background so container keeps running
python3 /app/gen_data_default.py &

echo "Starting HTTP server on port 8000..."

python3 -m http.server 8000 -d /app
