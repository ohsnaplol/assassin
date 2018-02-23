var express = require('express')
var router = express.Router()
var db = require('../models')

router.get('/', function (request, response) {
  response.render('index')
})

router.get('/signup', function (request, response) {
  response.render('signup')
})

router.get('/browse', function (request, response) {
  db.Game.findAll({}).then(function(dbGame){
    var hbsObject = {
      game: dbGame
    }
    response.render('gamebrowser', hbsObject)
  })
})

router.get('/create', function (request, response) {
  response.render('creategame')
})

router.get('/game/id/:id', function (request, response) {
  db.Game.findOne({
    where: {
      id: request.params.id
    }
  }).then(function(dbGame) {
    var hbsObject = {
      game: dbGame
    }
    response.render('game', hbsObject)
  })
})

router.get('/admin', function (request, response) {
  response.render('admin')
})

router.get('/player', function (request, response) {
  response.render('player')
})

router.post('/api/creategame', function(request, response) {
  console.log(request.body)
  db.Game.create({
    title: request.body.inputTitle,
    location: request.body.inputLocation,
    description: request.body.inputDescription,
    password: request.body.inputPlayerPassword,
    adminPassword: request.body.inputAdminPassword,
    gameIsActive: false
  }).then(function(dbGame) {
    var hbsObject = {
      game: dbGame
    }
    response.render('game', hbsObject)
  })
})

module.exports = router