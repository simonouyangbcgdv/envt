const AWS = require('aws-sdk')

const downloadFileFromS3 = ({ bucket, key }) => {
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
    }
  })

  const s3Params = {
    Bucket: bucket,
    Key: key,
  }

  return s3.getObject(s3Params).promise()
}

module.exports = downloadFileFromS3
