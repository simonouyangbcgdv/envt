const utils = require('../../src/utils')
const edit = require('../../src/cli/edit')
const constants = require('../../src/constants')

test('fails for missing environment option', () => {
  const spy = jest.spyOn(utils, 'log')
  edit()

  expect(spy).toHaveBeenCalledWith(constants.usageText)
  spy.mockRestore()
})
