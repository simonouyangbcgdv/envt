const Config = require('../Config')
const hasAwsCliConfigured = require('./hasAwsCliConfigured')

const isKeyPresent = key => process.env[key] && process.env[key].length > 0

const areEnvVarsPresent = () => (
  isKeyPresent('AWS_ACCESS_KEY_ID') &&
    isKeyPresent('AWS_SECRET_ACCESS_KEY') &&
      isKeyPresent('AWS_DEFAULT_REGION')
)

const validateAwsCredentialsPresence = () => {
  if (Config.credentialsFromAwsCli) {
    return hasAwsCliConfigured()
  }

  if (areEnvVarsPresent()) {
    return hasAwsCliConfigured({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('MissingAWSEnvKey')
}

module.exports = validateAwsCredentialsPresence
