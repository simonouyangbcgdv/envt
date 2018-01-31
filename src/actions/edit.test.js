const utils = require('../utils')
const edit = require('./edit')
const constants = require('../constants')

test('fails for missing environment option', () => {
  const spy = jest.spyOn(utils, 'log')
  edit()

  expect(spy).toHaveBeenCalledWith(constants.usageText)
  spy.mockRestore()
})
