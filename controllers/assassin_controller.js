var express = require('express')
var router = express.Router()
var db = require('../models')

router.get('/', function (request, response) {
  response.redirect('browse')
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

router.get('/admin/:id', function (request, response) {
  console.log('/admin/:id CALLED')
  console.log('REQUEST.PARAMS.ID = ' + request.params.id)
  var gameId = request.params.id
  var hbsObject = {}
  db.Game.findOne({
    where: {
      id: gameId
    }
  }).then(function(dbGame) {
    db.Player.findAll({
      where: {
        GameId: gameId
      }
    }).then(function(dbPlayer) {
      hbsObject = {
        game: dbGame,
        player: dbPlayer
      }
      console.log('render admin page with ' + JSON.stringify(hbsObject))
      response.render('admin', hbsObject)
    })
  })
})

router.get('/player', function (request, response) {
  response.render('player')
})

router.post('/api/:id/authenticatePlayer', function(request,response) {
  var inputPlayerPass = request.body.password
  var name = request.body.name

})

router.post('/api/authenticateAdmin/:id', function(request, response) {
  var inputAdminPass = request.body.adminpassword
  var gameId = request.params.id
  db.Game.findOne({
    where: {
      id: gameId
    }
  }).then(function(dbGame) {
    if(inputAdminPass == dbGame.adminPassword) {
      response.redirect(`/admin/${dbGame.id}`)
    }
  })
})

router.put('/api/startGame/:id', function(request, response) {
  console.log('PUT CALLED')
  var gameid = request.params.id
  db.Game.update({
    gameIsActive: true
  }, {
    where: {
      id: gameid
    }
  }).then(function(dbGame) {
    console.log('THEN SUCCESS! GameId = ' + gameid)
    response.redirect(`back`)
  })
})

router.post('/api/addPlayer/:toGameWithid', function(request, response) {
  var inputName = request.body.name
  var playerPass = request.body.password
  var gamePass = request.body.gamepasscode
  var gameid = request.params.toGameWithid
  db.Game.findOne({
    where: {
      id: gameid
    }
  }).then(function(dbGame) {
    // check if player already exists
    db.Player.findOne({
      where: {
        GameId: gameid,
        name: inputName
      }
    }).then(function(entry) {
      if(entry == null) {
        console.log('entry == null')
        // check if passcode is valid
        if(gamePass == dbGame.password) {
          db.Player.create({
            name: inputName,
            password: playerPass,
            GameId: gameid
          }).then(function(result) {
            response.redirect(`/game/id/${gameid}`)
          })
        }
      } else {
        console.log('entry already exists')
        return
      }
    })
  })
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
    response.redirect(`/game/id/${dbGame.id}`)
  })
})

module.exports = router