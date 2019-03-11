/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('phoneType', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true
		}
	}, {
		timestamps: false,
		tableName: 'phoneType'
	});
};
