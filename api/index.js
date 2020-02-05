const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const app = express();
const PORT = 3000;
const {ObjectId} = mongodb;

const DB = {
	config: 'mongodb://mongo:27017'
};
let dbo;

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.json({ "hello": "express with mongo" });
});

const client = mongodb.MongoClient;
client.connect(DB.config, function (err, db) {
	if (err) {
		console.log('database is not connected')
	}
	else {
		console.log('connected!!');
		dbo = db.db("midb");
	}
});
app.get('/misdatos', function (req, res) {
	let data = dbo.collection("micoleccion").find({}).toArray((err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.post('/misdatos', function (req, res) {
	const task = req.body;
	console.log('reqqq', req)
	console.log('TASK', task)
	let data = dbo.collection("micoleccion").insert(task, function(error, result) {
		if (error) {
			res.sendStatus(400);
		} else {
			res.json(result.ops[0]);
		}
	});
});

app.delete ('/misdatos', function (req, res) {
	console.log('re1',req.body._id);
	const idToDelete = req.body._id;
	console.log('como objeto',{_id: idToDelete})
	console.log('con la mierda',{_id: ObjectId(idToDelete)})
	let data = dbo.collection("micoleccion").deleteOne({_id: ObjectId(idToDelete)}, function(error) {
		if (error) {
			res.sendStatus(400);
		} else {
			res.sendStatus(204);
		}
	});
});

app.listen(PORT, function () {
	console.log('Your node js server is running on PORT:', PORT);
});

