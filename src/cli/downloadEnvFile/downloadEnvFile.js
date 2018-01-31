const Config = require('../../Config')
const utils = require('../../utils')

module.exports = file => new Promise((resolve, reject) => {
  utils.downloadFileFromS3({ bucket: Config.s3Bucket, key: file })
    .then((data) => {
      const envObject = utils.parseEnvKeysToObject(data.Body.toString())

      resolve(envObject)
    })
    .catch(reject)
})
