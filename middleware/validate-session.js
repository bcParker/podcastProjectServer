var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = (req, res, next) => {
	if(req.method === 'OPTIONS') {
		next();
	} else {
		let sessionToken = req.headers.authorization;
		if(!sessionToken){
			return res.status(403).send({auth: false, message: 'NO TOKEN PROVIDED'});
		} else {
			jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
				//console.log(decoded)
				//console.log(sessionToken)
				if (decoded) {
					User.findOne({where: {id: decoded.id}}).then(user => {
						req.user = user;
						//console.log(user)
						next();
					}),
					function (){
						res.status(401).send({Error: 'NOT AUTHORIZED'})
					}
				} else {
					res.status(400).send({Error: 'NOT SUPPORTED'})
				}
			})
		}
	}
}