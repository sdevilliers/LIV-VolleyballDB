/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  const permissions = sequelize.define('permissions', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(150),
			allowNull: false,
			unique: true
		}
	}, {
		timestamps: false,
		tableName: 'permissions'
	});

	permissions.associate = function () {
    const roles = sequelize.models.roles;
    const rolePermissions = sequelize.models.rolePermissions;

		permissions.belongsToMany(roles, { through: { model: rolePermissions }, foreignKey: 'permissionId'});
	};

	return permissions;
};
