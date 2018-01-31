const AWS = require('aws-sdk')

const hasAwsCliConfigured = credentials => new Promise((resolve, reject) => {
  const params = {}

  if (credentials) {
    params.credentials = credentials
  }

  const sts = new AWS.STS(params)

  const onCallerIdentity = (err, data) => {
    if (err) {
      reject(err.code)
    } else {
      resolve(data.UserId)
    }
  }

  sts.getCallerIdentity({}, onCallerIdentity)
})

module.exports = hasAwsCliConfigured
