#! /usr/bin/env node

const meow = require('meow')
const envt = require('./src/envt')
const { usageText } = require('./src/constants')

const cli = meow(usageText, {
  flags: {
    port: {
      type: 'number',
      alias: 'p',
    },
    credentials: {
      type: 'string',
    },
    s3Bucket: {
      type: 'string',
      alias: 'b',
    },
  },
})

const action = cli.input.shift()
envt(action, cli.input, cli.flags)
