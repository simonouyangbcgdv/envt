const express = require('express')

const buildServer = (onSaveAndClose) => {
  const app = express()
  
  app.set('view engine', 'pug')
  app.set('views', './src/web/views') 
  
  app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  });
  
  app.post('/keys', function (req, res) {
    res.json({})
    onSaveAndClose()
  });
  
  return app
}

module.exports = buildServer