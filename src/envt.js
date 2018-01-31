const chalk = require('chalk')

const { usageText } = require('./constants')
const utils = require('./utils')
const edit = require('./actions/edit')

module.exports = {
  run: (input, args, flags) => {
    utils.validateAwsCredentialsPresence()
      .then(() => {
        switch (input) {
          case 'edit':
            edit(args, flags)
            break
          default:
            utils.log(usageText)
        }
      })
      .catch((error) => {
        utils.log(chalk.red(`\nFailed to start: ${error}`))
        utils.log(usageText)
      })
  },
}
