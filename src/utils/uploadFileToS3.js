const AWS = require('aws-sdk')
const Config = require('../Config')

const uploadFileToS3 = ({ bucket, key, data }) => {
  const s3 = new AWS.S3(Config.awsOptions)

  const s3Params = {
    Bucket: bucket,
    Body: data,
    Key: key,
  }

  return s3.putObject(s3Params).promise()
}

module.exports = uploadFileToS3
