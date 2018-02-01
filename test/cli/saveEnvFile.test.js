const AWS = require('aws-sdk-mock')
const fs = require('fs')
const saveEnvFile = require('../../src/cli/saveEnvFile')

const testTmpFolder = './test/support/tmp'
const envObject = [{ key: 'HEY', value: 'VALUE' }]
const options = { tmpPath: testTmpFolder }

beforeAll(() => {
  AWS.mock('S3', 'putObject', { ETag: '123' })
})

afterAll(() => {
  AWS.restore('S3')
})

test('creates temporary file to upload', (done) => {
  const assertion = (data) => {
    expect(data).toEqual({ ETag: '123' })
    done()
  }

  saveEnvFile('env/env.vars', envObject, options).then(assertion)
})

test('deletes temporary file after upload', (done) => {
  const assertion = () => {
    const files = fs.readdirSync(testTmpFolder)

    expect(files.length).toEqual(0)
    done()
  }

  saveEnvFile('env/env.vars', envObject, options).then(assertion)
})
