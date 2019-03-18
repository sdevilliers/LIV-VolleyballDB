// /* jshint indent: 1 */
//
// module.exports = function(sequelize, DataTypes) {
// 	const address = sequelize.define('address', {
// 		id: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true
// 		},
// 		streetOne: {
// 			type: DataTypes.STRING(100),
// 			allowNull: false
// 		},
// 		streetTwo: {
// 			type: DataTypes.STRING(100),
// 			allowNull: true
// 		},
// 		city: {
// 			type: DataTypes.STRING(100),
// 			allowNull: false
// 		},
// 		stateId: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false,
// 			references: {
// 				model: 'states',
// 				key: 'id'
// 			}
// 		},
// 		zip: {
// 			type: DataTypes.INTEGER(5),
// 			allowNull: false
// 		},
// 		zipFour: {
// 			type: DataTypes.INTEGER(4),
// 			allowNull: false
// 		},
// 		companyId: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: true,
// 			references: {
// 				model: 'company',
// 				key: 'id'
// 			}
// 		},
// 		quoteId: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: true,
// 			references: {
// 				model: 'quotes',
// 				key: 'id'
// 			}
// 		},
// 		customerId: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: true
// 		}
// 	}, {
// 		timestamps: false,
// 		tableName: 'address'
// 	});
//
// 	address.associate = function () {
//     const states = sequelize.models.states;
//     const company = sequelize.models.company;
//     const quotes = sequelize.models.quotes;
//     const customers = sequelize.models.customers;
//
// 		address.belongsTo(states, { foreignKey: 'statesId' });
// 		address.belongsTo(company, { foreignKey: 'companyId' });
// 		address.belongsTo(quotes, { foreignKey: 'quoteId' });
// 		address.belongsTo(customers, { foreignKey: 'customerId' });
// 	};
//
// 	return address;
// };
