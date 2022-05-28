#!/usr/bin/env bash

./node_modules/.bin/concurrently \
  -n CHESS,UI,DEV-SERVER \
  -c "bgWhite.bold.black,bgGreen.bold.black,bgRed.bold.white" \
  "npm run build:chess:watch" "npm run build:ui:watch" "npm run dev"
