const downloadFileFromS3 = require('./downloadFileFromS3')
const parseEnvKeysToObject = require('./parseEnvKeysToObject')
const randomString = require('./randomString')
const saveTemporaryFile = require('./saveTemporaryFile')
const uploadFileToS3 = require('./uploadFileToS3')
const convertObjectToEnv = require('./convertObjectToEnv')
const log = require('./log')
const hasAwsCliConfigured = require('./hasAwsCliConfigured')
const validateAwsCredentialsPresence = require('./validateAwsCredentialsPresence')

module.exports = {
  downloadFileFromS3,
  parseEnvKeysToObject,
  randomString,
  saveTemporaryFile,
  uploadFileToS3,
  convertObjectToEnv,
  log,
  hasAwsCliConfigured,
  validateAwsCredentialsPresence,
}
