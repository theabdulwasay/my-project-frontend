#!/bin/bash
# Copy frontend files to public directory for Vercel
set -e
echo "Creating public directory..."
mkdir -p public
echo "Copying frontend files..."
cp -r frontend/* public/ 2>/dev/null || true
ls -la public/ | head -20
echo "✓ Build complete: Frontend files copied to public/"
