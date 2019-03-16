/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  const team = sequelize.define('team', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false
		}
	}, {
		timestamps: false,
		tableName: 'team'
	});

	team.associate = function () {

    const addresses = sequelize.models.address;
    const users = sequelize.models.users;
    const subscriptionType = sequelize.models.subscriptionType;
    const subscriptions = sequelize.models.subscriptions;

		team.hasMany(users, { foreignKey: 'teamId' });
		team.hasMany(addresses, { foreignKey: 'teamId' });
		team.belongsToMany(subscriptionType, { through: { model: subscriptions }, foreignKey: 'teamId'});

	};

	return team;
};
