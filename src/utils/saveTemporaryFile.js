const fs = require('fs')
const randomString = require('./randomString')

const saveTemporaryFile = (content, options = {}) => {
  return new Promise((resolve, reject) => {
    const tmpFolder = options.tmpPath || './tmp'
    const tmpFilePath = `${tmpFolder}/${randomString()}`

    if (!fs.existsSync(tmpFolder)) {
      fs.mkdirSync(tmpFolder)
    }

    fs.writeFile(tmpFilePath, content, (err) => {
      if (err) { reject(err) }

      resolve(tmpFilePath)
    })
  })
}

module.exports = saveTemporaryFile
