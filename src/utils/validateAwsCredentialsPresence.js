const Config = require('../Config')
const hasAwsCliConfigured = require('./hasAwsCliConfigured')

const validateAwsCredentialsPresence = () => {
  if (Config.credentialsFromAwsCli) {
    return hasAwsCliConfigured()
  }

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    return hasAwsCliConfigured({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('MissingAWSEnvKey')
}

module.exports = validateAwsCredentialsPresence
