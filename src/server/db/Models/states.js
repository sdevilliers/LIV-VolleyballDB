/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  const states = sequelize.define('states', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		abbreviation: {
			type: DataTypes.STRING(2),
			allowNull: true
		}
	}, {
		timestamps: false,
		tableName: 'states'
	});

	states.associate = function () {
    const address = sequelize.models.address;
		states.hasMany(address, {foreignKey: 'stateId'});
	};
	return states;
};
