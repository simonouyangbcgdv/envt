const fs = require('fs')
const rimraf = require('rimraf')
const saveTemporaryFile = require('./saveTemporaryFile')

const testTmpFolder = './tmp/temporary'

const deleteTestTmpFolder = () => {
  rimraf(testTmpFolder, (err) => {
    if (err) { throw new Error('unable to delete test tmp folder') }
  })
}

beforeAll(() => {
  deleteTestTmpFolder()
})

afterAll(() => {
  deleteTestTmpFolder()
})

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
