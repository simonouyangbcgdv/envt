const fs = require('fs')
const utils = require('../utils')

const saveEnvFile = (file, envObject, options = {}) => new Promise((resolve, reject) => {
  const tmpPath = options.tmpPath || './tmp'
  const envText = utils.convertObjectToEnv(envObject)

  utils.saveTemporaryFile(envText, { tmpPath })
    .then((filePath) => {
      const buffer = fs.readFileSync(filePath)

      utils.uploadFileToS3({ bucket: 'secrets-blackhole', key: file, data: buffer })
        .then((data) => {
          // TODO: Remove temporary file
          resolve(data)
        })
    })
    .catch((err) => {
      reject(err)
    })
})

module.exports = saveEnvFile
