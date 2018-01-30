const utils = require('../utils')

module.exports = file => new Promise((resolve, reject) => {
  // TODO: Remove hardcoded bucket. Get from config.
  utils.downloadFileFromS3({ bucket: 'secrets-blackhole', key: file })
    .then((data) => {
      const envObject = utils.parseEnvKeysToObject(data.Body.toString())

      resolve(envObject)
    })
    .catch(reject)
})
