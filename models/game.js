module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: true
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
    Game.hasMany(models.Player, {
      onDelete: 'SET NULL'
    })
  }

  return Game
}