const Config = require('../Config')
const hasAwsCliConfigured = require('./hasAwsCliConfigured')

const areEnvVarsPresent = () => (
  process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_ACCESS_KEY_ID.length > 0 &&
      process.env.AWS_SECRET_ACCESS_KEY &&
        process.env.AWS_SECRET_ACCESS_KEY.length > 0
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
