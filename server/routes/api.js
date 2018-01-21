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
connection.connect(function() {
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
	  connection.query('SELECT * FROM epic', function(err, rows, fields) {
		if (err) throw err;
		console.log('Express: got ', rows[0].Name + ' from mysql');
		res.send(rows);
	  });
});

module.exports = router;