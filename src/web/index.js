const express = require('express')
const downloadEnvFile = require('../downloadEnvFile')

const buildServer = (onSaveAndClose) => {
  const app = express()

  app.set('view engine', 'pug')
  app.set('views', './src/web/views')

  app.get('/', function (req, res) {
    downloadEnvFile('env/env.vars')
      .then(data => {
        res.render('index', {
          title: 'Hey',
          message: 'Hello there!',
          env: data,
        })
      })
      .catch(err => {
        res.status(500).send(`Something broke! ${err}`)
      })
  });

  app.post('/keys', function (req, res) {
    res.json({})
    onSaveAndClose()
  });

  return app
}

module.exports = buildServer
