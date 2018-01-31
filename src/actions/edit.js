const opn = require('opn')
const chalk = require('chalk')

const Config = require('../Config')
const web = require('../web')
const utils = require('../utils')
const { usageText } = require('../constants')

const edit = (params) => {
  if (!params || !params[0]) {
    utils.log(usageText)
    return
  }

  const server = web(() => {
    // TODO: Exit app after save?
    // process.exit(1)
  })

  server.listen(Config.port)
  utils.log(`Envt server is running on port ${chalk.green(Config.port)}`)
  opn(`http://localhost:${Config.port}`)
}

module.exports = edit
