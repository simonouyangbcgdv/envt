const parseEnvKeysToObject = require('./parseEnvKeysToObject')

test('converts single item js array to key=value ENV format', () => {
  const envObject = parseEnvKeysToObject('KEY=VALUE\n')

  expect(envObject).toEqual([{ key: 'KEY', value: 'VALUE' }])
})

test('converts multiple item js array to key=value ENV format', () => {
  const envObject = parseEnvKeysToObject('KEY=VALUE\nAPP=envt\n')

  expect(envObject).toEqual([
    { key: 'KEY', value: 'VALUE' },
    { key: 'APP', value: 'envt' },
  ])
})
