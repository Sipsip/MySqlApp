const express = require('express');
const router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mfj123',
	database: 'pm'
});

//connection.connect();
connection.connect(function () {
	console.log("Database connected");
});


// Error handling
const sendError = (err, res) => {
	response.status = 501;
	response.message = typeof err == 'object' ? err.message : err;
	res.status(501).json(response);
};

// Response handling
let response = {
	status: 200,
	data: [],
	message: null
};

// Get users
router.get('/users', (req, res) => {
	/*
	connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
		if (err) throw err;
		console.log('The solution is: ', rows[0].solution);
	  });
	  */
	connection.query('SELECT * FROM epic', function (err, rows, fields) {
		if (err) throw err;
		if (typeof rows[0] !== "undefined") {
			console.log('Express: got ', rows[0].Name + ' from mysql');
		} else { 
			console.log("Express: getAll-Response empty or missing") 
		}


		res.send(rows);
	});
});

router.post('/users', (req, res) => {

	console.log('Express: got HTTP-Post from client. ', req + ' gets created');
	//connection.query('INSERT INTO `pm`.`epic` (`EpicID`, `Name`, `Description`, `Priority`) VALUES ('4', 'epic4', 'epic4 ist hier', '1');', function(err, rows, fields) {

	connection.query('INSERT INTO epic SET ?', req.body, function (err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});

	/*
	config.connection.query(‘INSERT INTO client SET ?’, value1, function (err,result) {
		if (err) {
		console.log(“ERROR IN QUERY”);
		} else {
		console.log(“Insertion Successful.” + result);
		console.log(‘Inserted ‘ + result.affectedRows + ‘ rows’);
		res.end(result);
		}
		});
		*/
});
module.exports = router;