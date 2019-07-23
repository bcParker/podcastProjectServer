const router = require('express').Router();
const sequelize = require('../db')
const Playlist = sequelize.import('../models/playlist');
//const Playlist = require('../db').import('../models/playlist')


router.post('/add', (req, res) => {
	Playlist.create({
		title: req.body.playlist.title,
		user: req.user.id
	})
	.then(log => res.status(200).json({Message: 'Added to playlist'}))
	.catch(err => res.status(500).json(err))
})

router.get('/userPage', (req, res) => {
	Playlist.findAll()
		.then(log => res.status(200).json(log))
		.catch(err => res.status(500).json({Error: 'Failed to retrieve'}))
})

router.delete('/delete', (req, res) => {

})

module.exports = router;