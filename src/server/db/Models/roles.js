/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  const roles = sequelize.define('roles', {
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
		}
	}, {
		timestamps: false,
		tableName: 'roles'
	});

	roles.associate = function () {
    const permissions = sequelize.models.permissions;
    const rolePermissions = sequelize.models.rolePermissions;
    const users = sequelize.models.users;
		roles.hasMany(users, {foreignKey: 'roleId'});
		roles.belongsToMany(permissions, { through: { model: rolePermissions }, foreignKey: 'roleId'});
	};

	return roles;
};
