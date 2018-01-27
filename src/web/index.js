const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', './src/web/views') 

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

module.exports = app