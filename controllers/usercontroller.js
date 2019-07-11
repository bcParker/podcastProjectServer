const router = require('express').Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validate = require('../middleware/validate-session');

router.post('/signup', (req, res) => {
	User.create({
		username: req.body.user.username,
		password: bcrypt.hashSync(req.body.user.password, 10)
	})
		.then(user => {
			let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

			res.json({
				user: user,
				message: 'USER CREATED (و ˃̵ᴗ˂̵)و',
				sessionToken: token
			})
		})
		.catch(err => res.status(500).json({Error: 'FAILED TO CREATE USER'}))
})

router.post('/login', (req, res) => {
	User.findOne({where: {username: req.body.user.username}})
		.then(user => {
			if (user) {
				bcrypt.compare(req.body.user.password,
					user.password, (err, matches) => {
						if (matches) {
							let token = jwt.sign({id: user.id},
								process.env.JWT_SECRET, {expiresIn: 60*60*24})
							res.json({
								user: user, 
								message: 'SUCCESSFULLY AUTHENTICATED (و ˃̵ᴗ˂̵)و',
								sessionToken:     token
							})
						} else {
							res.status(502).send({Error: 'FAILED TO AUTHENTICATE'})
						}
					})
			} else {
				res.status(502).send({Error: 'FAILED TO MATCH TOKEN'})
			}
		}, err => status(501).send({Error: 'FAILED TO PROCESS'}))
})

/*
router.get('/userPage', (req, res) => {
	//This will need to retreive and display the information from podcastURL column of user table
})
*/


router.put('/add', Validate,  (req, res) => {
	console.log(req.user.id)
	User.update({podcastURL: [req.body.user.podcastURL]}, {where: {id: req.user.id}})
		.then(log => res.status(200).json({ message: 'Added to Playlist' }))
		.catch(err => res.status(500).json({ Error: 'Failed to add' }))
	//This will need to either grab data from Listen API and store it in the podcastURL or grab the information from what is already displayed on the screen
})


/*
router.delete('/delete', (req, res) => {
	//This will need to remove an item from the podcastURL column of user table
})
*/

module.exports = router;