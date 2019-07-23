module.exports = function (sequelize, DataTypes) {
	const Playlist = sequelize.define(
		'playlist', {
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			user: {
				type: DataTypes.INTEGER,
				allowNull: true
			}
		})

		return Playlist;
		
}