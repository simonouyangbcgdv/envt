const web = require('./web')
const opn = require('opn')

const edit = (flags) => {
  const server = web(() => {
    // TODO: Exit app after save?
    // process.exit(1)
  })

  server.listen(flags.port)

  opn(`http://localhost:${flags.port}`)
}

module.exports = {
  run: (input, flags) => {
    switch (input) {
      case 'edit':
        edit(flags)
        break
      default:
        console.log('Invalid option!')
    }
  },
}
