const chalk = require('chalk')

const { usageText } = require('./constants')
const Config = require('./Config')
const utils = require('./utils')
const edit = require('./actions/edit')

const overrideDefaultConfigs = (flags) => {
  if (flags.port) { Config.port = flags.port }
  if (flags.credentials) { Config.credentials = flags.credentials }
  if (flags.s3Bucket) { Config.s3Bucket = flags.s3Bucket }
  if (flags.s3Bucket) { Config.s3Bucket = flags.s3Bucket }
}

const validateStart = () => {
  if (!Config.s3Bucket) {
    // eslint-disable-next-line
    return Promise.reject('MissingS3Bucket')
  }

  return utils.validateAwsCredentialsPresence()
}

module.exports = (input, args, flags) => {
  overrideDefaultConfigs(flags)

  validateStart()
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
