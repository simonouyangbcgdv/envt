const AWS = require('aws-sdk-mock')
const downloadEnvFile = require('../../src/cli/downloadEnvFile')

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
    process.env.AWS_ACCESS_KEY_ID = 'dd'
    process.env.AWS_SECRET_ACCESS_KEY = 'dd'
  })

  afterAll(() => {
    process.env = env
  })

  test('fails to download file for invalid credentials', (done) => {
    downloadEnvFile('file').catch((err) => {
      expect(err.code).toBe('AccessDenied')
      done()
    })
  })
})
