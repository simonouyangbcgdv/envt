class Config {
  constructor(config) {
    this.config = config || {}
  }

  get port() {
    return this.config.port
  }

  set port(value) {
    this.config.port = value
  }

  set credentials(value) {
    this.config.credentials = value
  }

  get credentialsFromAwsCli() {
    return this.config.credentials === 'awscli'
  }

  get credentialsFromEnv() {
    return this.config.credentials === 'env'
  }

  get s3Bucket() {
    return this.config.s3Bucket
  }

  set s3Bucket(value) {
    this.config.s3Bucket = value
  }

  get awsOptions() {
    if (this.config.credentials !== 'env') { return {} }

    return {
      credentials: {
        eaccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION,
      },
    }
  }
}

module.exports = new Config({
  credentials: 'awscli',
  port: 5000,
  s3Bucket: '',
  environment: 'development',
})
