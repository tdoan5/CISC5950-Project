var express = require('express');
var router = express.Router();

'use strict';

/* GET block page. */
router.get('/', function (req, res, next) {
    res.send('get respond from blocks');

});

router.post('/', function (req, res, next) {
    var input = req.body.input;
    var length_input = input.length;
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var url = 'mongodb://45.63.13.24:27017/test';
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var col = db.collection('block');
        if (length_input === 64) {
            console.log(input);
            col.find({"blocks.hash": input}).limit(1).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.send({'message': "internal error"});
                }else if (docs.length !== 1){
                    res.send({'message': "Input error, keyword not found"});
                }else{
                    console.log(docs);
                    res.send({'message': JSON.stringify(docs)});
                }
            });
        } else if (length_input < 10 && length_input > 0) {
            console.log(input);
            col.find({"blocks.height": Number(input)}).limit(1).toArray(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.send({'message': "internal error"});
                }else if (docs.length !== 1){
                    res.send({'message': "Input error, keyword not found"});
                }else{
                    console.log(docs);
                    res.send({'message': JSON.stringify(docs)});
                }
                // res.render('index', {title: JSON.stringify(docs)});
            });
        } else {
            console.log("input was wrong");
            res.send({'message': "input was wrong"});
        }
        db.close();
    });
});

module.exports = router;
