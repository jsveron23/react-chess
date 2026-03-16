#!/usr/bin/env bash

bunx concurrently \
  -n CHESS,UI,DEV-SERVER \
  -c "bgWhite.bold.black,bgGreen.bold.black,bgRed.bold.white" \
  "bun run build:chess:watch" "bun run build:ui:watch" "bun run dev"
