module.exports = function (sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    }, 
    password: {
      type: DataTypes.STRING
    },
    weapon: {
      type: DataTypes.STRING,
    },
    target: {
      type: DataTypes.STRING,
    },
    isSuccessful: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    kills: {
      type: DataTypes.STRING,
    },
    killedBy: {
      type: DataTypes.STRING,
    }
  })

  Player.associate = function(models) {
    Player.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Player
}