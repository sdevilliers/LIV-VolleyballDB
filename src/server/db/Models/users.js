// /* jshint indent: 1 */
//
// module.exports = function(sequelize, DataTypes) {
//   const users = sequelize.define('users', {
// 		id: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true
// 		},
// 		firstName: {
// 			type: DataTypes.STRING(50),
// 			allowNull: false
// 		},
// 		lastName: {
// 			type: DataTypes.STRING(100),
// 			allowNull: false
// 		},
// 		userName: {
// 			type: DataTypes.STRING(50),
// 			allowNull: false,
// 			unique: true
// 		},
// 		password: {
// 			type: DataTypes.STRING(100),
// 			allowNull: false
// 		},
// 		roleId: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false,
// 			references: {
// 				model: 'roles',
// 				key: 'id'
// 			}
// 		},
// 		emailAddress: {
// 			type: DataTypes.STRING(50),
// 			allowNull: false,
// 			unique: true
// 		},
//     salt: {
//       type: DataTypes.STRING(100),
//       allowNull: false
//     },
// 		resetPasswordExpires: {
// 			type: DataTypes.DATE,
// 			allowNull: true
// 		},
// 		resetPasswordToken: {
// 			type: DataTypes.STRING(150),
// 			allowNull: true
// 		}
// 	}, {
// 		timestamps: false,
// 		tableName: 'users'
// 	});
//
// 	users.associate = function () {
//     const roles = sequelize.models.roles;
// 		users.belongsTo(roles, { foreignKey: 'roleId' });
//
//     const company = sequelize.models.company;
// 		users.belongsTo(company, { foreignKey: 'teamId' });
// 	};
//
// 	return users;
// };
