#!/usr/bin/env bash

./node_modules/.bin/concurrently -n watch-chess,webpack-dev \
  -c "bgYellow.black.bold,bgWhite.black.bold" \
  "npm run build:chess" "webpack-dev-server"
