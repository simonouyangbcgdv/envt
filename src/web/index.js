const express = require('express')
const downloadEnvFile = require('../downloadEnvFile')

const buildServer = (onSaveAndClose) => {
  const app = express()

  app.set('view engine', 'pug')
  app.set('views', './src/web/views')

  app.get('/', (req, res) => {
    // TODO: Get from configuration. Remove hardcoded value.
    downloadEnvFile('env/env.vars')
      .then((env) => {
        res.render('index', { env })
      })
      .catch((err) => {
        res.status(500).send(`Something broke! ${err}`)
      })
  })

  app.post('/keys', (req, res) => {
    res.json({})
    onSaveAndClose()
  })

  return app
}

module.exports = buildServer
