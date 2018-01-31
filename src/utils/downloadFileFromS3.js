const AWS = require('aws-sdk')
const Config = require('../Config')

const downloadFileFromS3 = ({ bucket, key }) => {
  const s3 = new AWS.S3(Config.awsOptions)

  const s3Params = {
    Bucket: bucket,
    Key: key,
  }

  return s3.getObject(s3Params).promise()
}

module.exports = downloadFileFromS3
