const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/podcastApp`, {
	dialect: 'postgres'
})

sequelize.authenticate().then(
	function() {
		console.log("Connection to 'podcastApp' database successful (و ˃̵ᴗ˂̵)و");
	},
	function(err) {
		console.log(err);
	}
)

module.exports = sequelize;