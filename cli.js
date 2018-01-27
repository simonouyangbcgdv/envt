#! /usr/bin/env node

'use strict'

const meow = require('meow')
const envt = require('./src/envt')
const cli = meow(`
	Usage
	  $ envt <input>

	Options
	  --env, -e Which environment variable to edit
	  --port, -p Port where the web app is running, default: 5000

	Examples
	  $ envt edit --env production
`, {
  flags: {
    env: {
      type: 'string',
      alias: 'e',
    },
    port: {
      type: 'number',
      alias: 'p',
      default: 5000,
    }
  }
});

envt.run(cli.input[0], cli.flags);