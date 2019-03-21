/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  const teams = sequelize.define('teams', {
    TeamsID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    TeamName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    Seed: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true
    },
    captian: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    playerTwo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    playerThree: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    playerFour: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    playerFive: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    playerSix: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'teams'
  });
  return teams;
};
