const usageText = `
Usage
  $ envt edit <environment>\tLaunched web app to edit ENV keys.

Required
  --s3Bucket\t\t\tAWS S3 Bucket where the .env files are stored.

Options
  --port, -p\t\t\tPort where the web app is running.

  --credentials [awscli, env]\tWhere to read credentials from, aws cli configuration or from the ENV.
                \t\tIf from the ENV, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY have to be set.

Examples
  $ envt edit production --s3Bucket secrets
`

module.exports = {
  usageText,
}
