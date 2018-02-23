module.exports = function (sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    weapon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kills: {
      type: DataTypes.STRING,
      allowNull: true
    },
    killedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
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