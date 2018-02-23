var express = require('express')
var router = express.Router()

router.get('/', function (request, response) {
  response.render('index')
})

router.get('/signup', function (request, response) {
  response.render('signup')
})

router.get('/browse', function (request, response) {
  response.render('gamebrowser')
})

router.get('/admin', function (request, response) {
  response.render('admin')
})

router.get('/player', function (request, response) {
  response.render('player')
})

module.exports = router