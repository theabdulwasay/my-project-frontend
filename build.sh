#!/bin/bash
# Copy frontend files to public directory for Vercel
mkdir -p public
cp -r frontend/* public/
echo "Build complete: Frontend files copied to public/"
