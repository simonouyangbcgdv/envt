const AWS = require('aws-sdk-mock')
const downloadEnvFile = require('./downloadEnvFile')

const env = Object.assign({}, process.env)

test('downloads .env file as object', (done) => {
  AWS.mock('S3', 'getObject', { Body: Buffer.from('KEY=value') })

  downloadEnvFile('file').then((data) => {
    expect(data).toEqual([{ key: 'KEY', value: 'value' }])
    done()
  })

  AWS.restore('S3')
})

describe('given no credentials present on ENV', () => {
  beforeAll(() => {
    process.env.AWS_ACCESS_KEY_ID = ''
    process.env.AWS_SECRET_ACCESS_KEY = ''
  })

  afterAll(() => {
    process.env = env
  })

  test('fails to download file for missing credentials', (done) => {
    downloadEnvFile('file').catch((err) => {
      expect(err.code).toBe('CredentialsError')
      done()
    })
  })
})
