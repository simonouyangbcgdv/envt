const convertObjectToEnv = require('../../src/utils/convertObjectToEnv')

test('converts single item js array to key=value ENV format', () => {
  const envText = convertObjectToEnv([{ key: 'KEY', value: 'VALUE' }])
  expect(envText).toEqual('KEY=VALUE\n')
})

test('converts multiple item js array to key=value ENV format', () => {
  const envText = convertObjectToEnv([
    { key: 'KEY', value: 'VALUE' },
    { key: 'APP', value: 'envt' },
  ])

  expect(envText).toEqual('KEY=VALUE\nAPP=envt\n')
})
