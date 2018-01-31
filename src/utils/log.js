const log = (text) => {
  if (process.env.NODE_ENV === 'test') { return }

  console.log(text)
}

module.exports = log
