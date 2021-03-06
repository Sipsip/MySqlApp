const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const HttpStatus = require('http-status-codes');

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

//----------------------------------------------------------------------
// GET /users
//----------------------------------------------------------------------
router.get('/users', (req, res) => {
	
	console.log('Express: got HTTP-Get from client. All Objects requested');

	connection.query('SELECT * FROM epic', function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /users/:id
//----------------------------------------------------------------------
router.get('/users/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Object with id = ', req.params.id + ' requested');
	
	connection.query('SELECT * FROM epic WHERE EpicID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// POST /users
//----------------------------------------------------------------------
router.post('/users', (req, res) => {

	console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');
	
	connection.query('INSERT INTO epic SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// PUT /users
//----------------------------------------------------------------------
router.put('/users', (req, res) => {

	console.log('Express: got HTTP-Put from client. ', req + ' gets updated');
	
	connection.query('REPLACE INTO epic SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// DELETE /users/:id
//----------------------------------------------------------------------
router.delete('/users/:id', (req, res) => {

	console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');
	
	connection.query('DELETE FROM epic WHERE EpicID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /users/byStory/:id
//----------------------------------------------------------------------
router.get('/users/byStory/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Object with id = ', req.params.id + ' requested');
	
	connection.query('SELECT * FROM task WHERE StoryID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});



///////////
// Tasks //
///////////
//----------------------------------------------------------------------
// GET /tasks
//----------------------------------------------------------------------
router.get('/tasks', (req, res) => {
	
	console.log('Express: got HTTP-Get from client. All Objects requested');

	connection.query('SELECT * FROM task', function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /tasks/:id
//----------------------------------------------------------------------
router.get('/tasks/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Object with id = ', req.params.id + ' requested');
	
	connection.query('SELECT * FROM task WHERE TaskID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /tasks/byStory/:id
//----------------------------------------------------------------------
router.get('/tasks/byStory/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Tasks with StoryID = ', req.params.id + ' requested');
	
	connection.query('SELECT * FROM task WHERE StoryID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// POST /tasks
//----------------------------------------------------------------------
router.post('/tasks', (req, res) => {

	console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');
	
	connection.query('INSERT INTO task SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// PUT /tasks
//----------------------------------------------------------------------
router.put('/tasks', (req, res) => {

	console.log('Express: got HTTP-Put from client. ', req + ' gets updated');
	
	connection.query('REPLACE INTO task SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// DELETE /tasks/:id
//----------------------------------------------------------------------
router.delete('/tasks/:id', (req, res) => {

	console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');
	
	connection.query('DELETE FROM task WHERE TaskID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});


module.exports = router;