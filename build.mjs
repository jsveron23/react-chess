#!/usr/bin/env bun
import { cp, rm } from 'fs/promises';
import { Glob } from 'bun';

const publicDir = 'public';
const assetsDir = 'src/assets';

// Clean public directory
console.log('🧹 Cleaning public directory...');
await rm(publicDir, { recursive: true, force: true });

// Copy HTML file
console.log('📄 Copying HTML file...');
const htmlFiles = new Glob('*.html').scan(assetsDir);
for await (const file of htmlFiles) {
  const src = `${assetsDir}/${file}`;
  const dest = `${publicDir}/${file}`;
  await cp(src, dest);
  console.log(`  ✓ ${file}`);
}

// Copy other assets (images, etc.)
console.log('🎨 Copying assets...');
const assetFiles = new Glob('!(*.html)').scan(assetsDir);
for await (const file of assetFiles) {
  const src = `${assetsDir}/${file}`;
  const dest = `${publicDir}/${file}`;
  await cp(src, dest);
  console.log(`  ✓ ${file}`);
}

console.log('✅ Build preparation complete!');
