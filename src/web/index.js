const express = require('express')
const path = require('path')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const downloadEnvFile = require('../cli/downloadEnvFile')
const saveEnvFile = require('../cli/saveEnvFile')
const utils = require('../utils')

const buildServer = (fileEnv, onSaveAndClose) => {
  const app = express()

  app.use(bodyParser.json())
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, '/views'))

  app.get('/', (req, res) => {
    downloadEnvFile(`env/env.${fileEnv}`)
      .then((env) => {
        res.render('index', { env })
      })
      .catch((err) => {
        utils.log(`Something broke! ${err}`)
        res.status(500).send(`Something broke! ${err}`)
      })
  })

  app.post('/keys', (req, res) => {
    const newEnv = req.body

    saveEnvFile(`env/env.${fileEnv}`, newEnv)
      .then((data) => {
        res.json(data)
        utils.log(`env.${chalk.green(fileEnv)} was updated`)
        onSaveAndClose()
      })
      .catch((err) => {
        utils.log(`Something broke! ${err}`)
        res.status(500).send(`Something broke! ${err}`)
      })
  })

  return app
}

module.exports = buildServer
