/* jshint indent: 1 */

// module.exports = function(sequelize, DataTypes) {
// 	return sequelize.define('phoneNumbers', {
// 		id: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true
// 		},
// 		number: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false
// 		},
// 		phoneTypeId: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false,
// 			references: {
// 				model: 'phoneType',
// 				key: 'id'
// 			}
// 		},
// 		comapanyId: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: true,
// 			references: {
// 				model: 'company',
// 				key: 'id'
// 			}
// 		},
// 		customerId: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: true,
// 			references: {
// 				model: 'customers',
// 				key: 'id'
// 			}
// 		}
// 	}, {
// 		timestamps: false,
// 		tableName: 'phoneNumbers'
// 	});
// };
