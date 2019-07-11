module.exports = function(sequelize, DataTypes) {
	const User = sequelize.define('user', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}, 
		podcastURL: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		}
	})

	return User;

}
