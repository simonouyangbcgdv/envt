const parseEnvKeysToObject = (envText) => {
  const envRule = /[A-Z]+=.+/
  const envLines = envText.split('\n')

  return envLines.reduce((envObject, definition) => {
    if (definition.match(envRule)) {
      const [key, value] = definition.split('=')
      envObject.push({ key, value })
    }
    return envObject
  }, [])
}

module.exports = parseEnvKeysToObject
