const AWS = require('aws-sdk-mock')
const rimraf = require('rimraf')
const saveEnvFile = require('../../src/cli/saveEnvFile')

const testTmpFolder = './test/support/tmp'

beforeAll(() => {
  AWS.mock('S3', 'putObject', { ETag: '123' })
})

afterAll(() => {
  rimraf(testTmpFolder, (err) => {
    if (err) { throw new Error('unable to delete test tmp folder') }
  })

  AWS.restore('S3')
})

test('creates file to upload', (done) => {
  saveEnvFile('env/env.vars', [{ key: 'HEY', value: 'VALUE' }], { testTmpFolder })
    .then((data) => {
      expect(data).toEqual({ ETag: '123' })
      done()
    })
})
