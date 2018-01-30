const AWS = require('aws-sdk-mock')
const rimraf = require('rimraf')
const saveEnvFile = require('./saveEnvFile')

const tmpPath = './tmp/temporary'

afterAll(() => {
  rimraf(tmpPath, (err) => {
    if (err) { throw new Error('unable to delete test tmp folder') }
  })
})

test('creates file to upload', (done) => {
  AWS.mock('S3', 'putObject', { ETag: '123' })

  saveEnvFile('env/env.vars', [{ key: 'HEY', value: 'VALUE' }], { tmpPath })
    .then((data) => {
      expect(data).toEqual({ ETag: '123' })
      done()
    })
})
