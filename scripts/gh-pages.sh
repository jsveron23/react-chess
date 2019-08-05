#!/usr/bin/env bash

# Remove origin/gh-pages branch
git push origin :gh-pages

# Production build
npm run build

# Add 'public' before commit
git add public

# Commit
git commit -m "Deploy to Github"

# Deploy
git subtree push --prefix public origin gh-pages

# Rollback
git reset --hard HEAD~1

# Clean everything like never happen
npm run clean
