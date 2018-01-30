const convertObjectToEnv = envObject => (
  envObject.reduce((envText, variable) => (
    `${envText}${variable.key}=${variable.value}\n`
  ), '')
)

module.exports = convertObjectToEnv
