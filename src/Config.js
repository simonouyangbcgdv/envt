class Config {
  constructor(configJson) {
    this.configJson = configJson || {}
  }

  get port() {
    return this.configJson.port
  }

  set port(value) {
    this.configJson.port = value
  }

  set credentials(value) {
    this.configJson.credentials = value
  }

  get credentialsFromAwsCli() {
    return this.configJson.credentials === 'awscli'
  }

  get credentialsFromEnv() {
    return this.configJson.credentials === 'env'
  }

  get awsOptions() {
    if (this.configJson.credentials !== 'env') { return {} }

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
})
