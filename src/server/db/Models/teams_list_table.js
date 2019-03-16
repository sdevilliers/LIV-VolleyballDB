/*jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var teams = sequelize.define('teams', {
    TeamsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TeamName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Seed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    captian: {
      type: DataTypes.STRING,
      allowNull: false
    },
    playerTwo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    playerThree: {
      type: DataTypes.STRING,
      allowNull: true
    },
    playerFour: {
      type: DataTypes.STRING,
      allowNull: true
    },
    playerFive: {
      type: DataTypes.STRING,
      allowNull: true
    },
    playerSix: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    timestamps: false,
    tableName: 'teams'
  });
  return tTeam;
};


