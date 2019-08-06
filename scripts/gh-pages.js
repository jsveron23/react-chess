#!/usr/bin/env node

const chalk = require('chalk')
const { spawnSync } = require('child_process')

const BRANCH = 'gh-pages'
const DIST = 'public'
const COMMIT = 'Deploy to Github'

function execute (step, cmd, args, prevSpsc) {
  console.log(chalk.blue(`STEP: ${step}`))

  const options = prevSpsc
    ? {
      input: prevSpsc.stdout
    }
    : {}
  const spsc = spawnSync(cmd, args, options)

  console.log(spsc.stdout.toString())
}

const commands = [
  [`Remove origin/${BRANCH} branch`, 'git', ['push', 'origin', `:${BRANCH}`]],
  ['Production build', 'npm', ['run', 'build']],
  [`Add ${DIST} before commit`, 'git', ['add', DIST]],
  ['Commit message', 'git', ['commit', '-m', COMMIT]],
  ['Deploy', 'git', ['subtree', 'push', '--prefix', DIST, 'origin', BRANCH]],
  ['Rollback', 'git', ['reset', '--hard', 'HEAD~1']],
  ['Clean everything like never happen', 'npm', ['run', 'clean']]
]

commands.forEach((command) => execute(...command))
