var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://localhost:27017/test";
var db;
mongoClient.connect(mongoUrl, function(error, database){
    db = database;
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Todo App!' });
});

router.get('/todo', function(req, res, next) {
    db.collection('todos').find().toArray(function(error, results){
        console.log(results);
        res.render('todo', { todos: results });
    });
});

router.post('/add', function(req, res, next){
    db.collection('todos').insertOne({
        title: req.body.todoTitle,
        date: req.body.dueDate
    });

    res.redirect('/todo');
});

router.get('/add', function(req, res, next){
    res.send("You should stop");
});

router.get('/remove', function(req, res, next){
    db.collection('todos').remove({
        _id: new mongodb.ObjectID(req.query.id)
    });

    res.redirect('/todo');
});


module.exports = router;
