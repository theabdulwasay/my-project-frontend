#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

console.log('Creating public directory...');
const publicDir = path.join(__dirname, 'public');
const frontendDir = path.join(__dirname, 'frontend');

try {
  copyDir(frontendDir, publicDir);
  const files = fs.readdirSync(publicDir);
  console.log(`✓ Build complete: Copied ${files.length} items to public/`);
  console.log('Sample files:', files.slice(0, 5).join(', '));
  process.exit(0);
} catch (error) {
  console.error('✗ Build failed:', error.message);
  process.exit(1);
}
