const AWS = require('aws-sdk-mock')
const rimraf = require('rimraf')
const saveEnvFile = require('./saveEnvFile')

const tmpPath = './tmp/temporary'

beforeAll(() => {
  AWS.mock('S3', 'putObject', { ETag: '123' })
})

afterAll(() => {
  rimraf(tmpPath, (err) => {
    if (err) { throw new Error('unable to delete test tmp folder') }
  })

  AWS.restore('S3')
})

test('creates file to upload', (done) => {
  saveEnvFile('env/env.vars', [{ key: 'HEY', value: 'VALUE' }], { tmpPath })
    .then((data) => {
      expect(data).toEqual({ ETag: '123' })
      done()
    })
})
