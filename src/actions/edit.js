const opn = require('opn')
const chalk = require('chalk')

const web = require('../web')
const utils = require('../utils')
const { usageText } = require('../constants')

const edit = (params, flags) => {
  if (!params || !params[0]) {
    utils.log(usageText)
    return
  }

  const server = web(() => {
    // TODO: Exit app after save?
    // process.exit(1)
  })

  server.listen(flags.port)
  utils.log(`Envt server is running on port ${chalk.green(flags.port)}`)
  opn(`http://localhost:${flags.port}`)
}

module.exports = edit
