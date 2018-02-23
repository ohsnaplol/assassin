module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    adminId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7]
      } 
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2]
      }
    },
    password: {
      type: DataTypes.STRING
    },
    adminPassword: {
      type: DataTypes.STRING
    },
    gameIsActive: {
      type: DataTypes.BOOLEAN
    }
  })

  Game.associate = function(models) {
    Game.hasOne(models.Player, {
      onDelete: 'SET NULL'
    })
  }

  return Game
}