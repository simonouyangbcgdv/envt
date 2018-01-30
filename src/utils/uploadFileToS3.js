const AWS = require('aws-sdk')

const uploadFileToS3 = ({ bucket, key, data }) => {
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
    },
  })

  const s3Params = {
    Bucket: bucket,
    Body: data,
    Key: key,
  }

  return s3.putObject(s3Params).promise()
}

module.exports = uploadFileToS3
