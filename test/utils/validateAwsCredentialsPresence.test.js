const AWS = require('aws-sdk-mock')
const sinon = require('sinon')

const Config = require('../../src/Config')
const validateAwsCredentialsPresence = require('../../src/utils/validateAwsCredentialsPresence')

const originalEnv = Object.assign({}, process.env)
const sandbox = sinon.createSandbox()

describe('checking configs from awscli', () => {
  test('returns accessKeyId after requesting aws for called details', (done) => {
    AWS.mock('STS', 'getCallerIdentity', (params, cb) => cb(null, { UserId: 'thatId' }))
    const stub = sinon.stub(Config, 'credentialsFromAwsCli').get(() => true)

    validateAwsCredentialsPresence()
      .then((accessKeyId) => {
        expect(accessKeyId).toEqual('thatId')
        done()
      })

    AWS.restore('STS')
    stub.restore()
  })

  test('fails if awscli is not configured', (done) => {
    AWS.mock('STS', 'getCallerIdentity', (params, cb) => cb({ code: 'CredentialsError' }))
    const stub = sinon.stub(Config, 'credentialsFromAwsCli').get(() => true)

    validateAwsCredentialsPresence()
      .catch((code) => {
        expect(code).toEqual('CredentialsError')
        done()
      })

    AWS.restore('STS')
    stub.restore()
  })
})

describe('checking configs from env', () => {
  beforeAll(() => {
    sandbox.stub(Config, 'credentialsFromAwsCli').get(() => false)
    sandbox.stub(Config, 'credentialsFromEnv').get(() => true)
  })

  afterAll(() => {
    sandbox.restore()
    process.env = originalEnv
  })

  test('returns accessKeyId from env', (done) => {
    process.env.AWS_ACCESS_KEY_ID = 'thatId'
    process.env.AWS_SECRET_ACCESS_KEY = 'thatSecret'

    AWS.mock('STS', 'getCallerIdentity', (params, cb) => (
      cb(null, { UserId: process.env.AWS_ACCESS_KEY_ID })
    ))

    validateAwsCredentialsPresence()
      .then((accessKeyId) => {
        expect(accessKeyId).toEqual('thatId')
        done()
      })

    AWS.restore('STS')
  })

  test('fails for missing aws env keys', (done) => {
    process.env.AWS_ACCESS_KEY_ID = ''
    process.env.AWS_SECRET_ACCESS_KEY = ''

    validateAwsCredentialsPresence()
      .catch((err) => {
        expect(err).toEqual('MissingAWSEnvKey')
        done()
      })
  })
})

