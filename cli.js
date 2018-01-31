#! /usr/bin/env node

const meow = require('meow')
const envt = require('./src/envt')
const { usageText } = require('./src/constants')

const cli = meow(usageText, {
  flags: {
    port: {
      type: 'number',
      alias: 'p',
      default: 5000,
    },
  },
})

const action = cli.input.shift()
envt.run(action, cli.input, cli.flags)
