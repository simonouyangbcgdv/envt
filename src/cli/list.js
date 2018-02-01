const Config = require('../Config')
const utils = require('../utils')
const { usageText } = require('../constants')

const list = (params) => {
  if (!params || !params[0]) {
    utils.log(usageText)
    return
  }

  const fileEnv = params[0]

  utils.downloadFileFromS3({ bucket: Config.s3Bucket, key: `env/env.${fileEnv}` })
    .then((data) => {
      process.stdout.write(data.Body.toString())
    })
    .catch(() => {
      process.exit(1)
    })
}

module.exports = list
