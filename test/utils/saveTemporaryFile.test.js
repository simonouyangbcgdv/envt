const fs = require('fs')
const rimraf = require('rimraf')
const saveTemporaryFile = require('../../src/utils/saveTemporaryFile')

const testTmpFolder = './test/support/tmp'

const deleteTestTmpFolder = (done) => {
  rimraf(testTmpFolder, (err) => {
    if (err) { throw new Error('unable to delete test tmp folder') }
    done()
  })
}

beforeEach(deleteTestTmpFolder)
afterEach(deleteTestTmpFolder)

test('creates /tmp folder if does not exists', (done) => {
  expect(fs.existsSync(testTmpFolder)).toEqual(false)

  saveTemporaryFile('', { tmpPath: testTmpFolder })
    .then(() => {
      expect(fs.existsSync(testTmpFolder)).toEqual(true)
      done()
    })
})

test('creates temporary file', (done) => {
  const content = 'this string is a lie'

  saveTemporaryFile(content, { tmpPath: testTmpFolder })
    .then((filePath) => {
      const buffer = fs.readFileSync(filePath)
      expect(buffer.toString()).toEqual(content)
      done()
    })
})
