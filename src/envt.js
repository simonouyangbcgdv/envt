const utils = require('./utils')
const { usageText } = require('./constants')

const edit = require('./actions/edit')

module.exports = {
  run: (input, args, flags) => {
    switch (input) {
      case 'edit':
        edit(args, flags)
        break
      default:
        utils.log(usageText)
    }
  },
}
