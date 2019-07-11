require('dotenv').config();

var express = require('express');
var app = express();
var test = require('./controllers/testcontroller');
var user = require('./controllers/usercontroller');
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

//test route to make sure router is properly communicating
app.use('/api/test', (req, res) => {
	res.send("I turned myself into a pickle. I'm Pickle Riiiiick")
});

//testing conection to contoller and models
app.use('/test', test);

app.use('/user', user);

//app.use(require('./middleware/validate-session'));

app.listen(process.env.PORT, () => {
	console.log('Wubba lubba lub dub dub!!! (ง ͡ʘ ͜ʖ ͡ʘ)ง');
})