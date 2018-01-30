const utils = require('../utils')

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    utils.downloadFileFromS3({ bucket: 'secrets-blackhole', key: file })
      .then(data => {
        const envObject = utils.parseEnvKeysToObject(data.Body.toString())

        resolve(envObject)
      })
      .catch(reject)
  })
}
