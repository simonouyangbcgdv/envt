const usageText = `
Usage

  $ envt <command> <environment>

  $ envt edit <environment>\tLaunch web app to edit environment variables
  $ envt list <environment>\tPrint environment variables

Options

  --s3Bucket\t\t\tAWS S3 Bucket where the .env files are stored. This is required.

  --port, -p\t\t\tPort where the web app is running.

  --credentials [awscli, env]\tWhere to read credentials from, aws cli configuration or from the ENV.
                \t\tIf from the ENV, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and AWS_DEFAULT_REGION have to be set.

Examples
  $ envt edit production --s3Bucket secrets
`

module.exports = {
  usageText,
}
