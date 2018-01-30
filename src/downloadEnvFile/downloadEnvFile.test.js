const downloadEnvFile = require('./downloadEnvFile')
const utils = require('../utils')
const sinon = require('sinon')

const env = Object.assign({}, process.env)

test('downloads .env file as object', (done) => {
  const getObjectMockResponse = { Body: Buffer.from('KEY=value') }
  sinon.stub(utils, 'downloadFileFromS3').resolves(getObjectMockResponse)

  downloadEnvFile('file').then((data) => {
    expect(data).toEqual([{ key: 'KEY', value: 'value' }])
    done()
  })

  utils.downloadFileFromS3.restore()
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
