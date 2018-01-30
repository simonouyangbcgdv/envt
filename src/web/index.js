const express = require('express')
const bodyParser = require('body-parser')
const downloadEnvFile = require('../downloadEnvFile')
const saveEnvFile = require('../saveEnvFile')

const buildServer = (onSaveAndClose) => {
  const app = express()

  app.use(bodyParser.json())
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
    const newEnv = req.body

    saveEnvFile('env/env.vars', newEnv)
      .then((data) => {
        res.json(data)
        onSaveAndClose()
      })
      .catch((err) => {
        res.status(500).send(`Something broke! ${err}`)
      })
  })

  return app
}

module.exports = buildServer
