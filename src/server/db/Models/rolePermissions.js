/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  const rolePermissions = sequelize.define('rolePermissions', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		roleId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'roles',
				key: 'id'
			}
		},
		permissionId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'permissions',
				key: 'id'
			}
		}
	}, {
		timestamps: false,
		tableName: 'rolePermissions'
	});

	rolePermissions.associate = function () {
    const roles = sequelize.models.roles;
    const permissions = sequelize.models.permissions;

		rolePermissions.belongsTo(roles, {foreignKey: 'roleId'});
		rolePermissions.belongsTo(permissions, {foreignKey: 'permissionId'});
	};

	return rolePermissions;
};
