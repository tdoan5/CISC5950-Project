var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var MongoClient = require('mongodb').MongoClient, assert = require('assert');
    var url = 'mongodb://45.63.13.24:27017/test';
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var col = db.collection('block');
        // Insert a single document
        col.find().limit(1).toArray(function (err, docs) {
            res.render('index', {title: JSON.stringify(docs)});
            db.close();
        });
    });
});

module.exports = router;
