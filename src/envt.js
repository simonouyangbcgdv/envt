const chalk = require('chalk')

const { usageText } = require('./constants')
const Config = require('./Config')
const utils = require('./utils')
const edit = require('./actions/edit')

const overrideDefaultConfigs = (flags) => {
  if (flags.port) { Config.port = flags.port }
  if (flags.credentials) { Config.credentials = flags.credentials }
}

module.exports = (input, args, flags) => {
  overrideDefaultConfigs(flags)

  utils.validateAwsCredentialsPresence()
    .then(() => {
      switch (input) {
        case 'edit':
          edit(args)
          break
        default:
          utils.log(usageText)
      }
    })
    .catch((error) => {
      utils.log(chalk.red(`\nFailed to start: ${error}`))
      utils.log(usageText)
    })
}
