const crypto = require('crypto')

const randomString = () => (
  crypto.randomBytes(24).toString('hex')
)

module.exports = randomString
