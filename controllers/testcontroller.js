var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');

router.post('/one', (req,res) => {
	res.send("Existence is Pain")
})

router.post('/two', (req, res) => {
	let testData = 'He\'s not a hot girl. He can\'t just bail on his life and set up shop in someone else\'s';
	TestModel.create({
		testdata: testData
	}).then(data => {
		res.send('Nobody exists on purpose, nobody belongs anywhere, everybody\'s gonna die. Come watch TV.')
	})
})


module.exports = router;