var db = require('../db')

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    var collection = db.get().collection('Agenda');
    var cursor = collection
        .find({ "speakers.className": { $regex: "speakers", $options: "i" } })
        .project({ _id: 0, tags: 1, speakers: 1 });



    cursor.toArray(function (err, docs) {
        if (err) {
            console.log('An error occurred white fetcing::', err);
            return;
        }
        console.log("Count::", docs.length);
        res.json(docs);
    })
});

router.get('/insert', function (req, res) {
    var collection = db.get().collection('players');
    var cursor = collection.insertMany([{ name: "messi", team: "BAR" }, { name: "messi", team: "BAR" }, { name: "messi", team: "BAR" }], function (err, response) {
        res.json(response);
    })
});


router.get('/delete', function (req, res) {
    var collection = db.get().collection('players')
    var cursor = collection.find().project({ name: 1, team: 1 }).sort({ name: 1, team: 1 });
    var prevDoc = { name: "", team: "" };
    var markedForDeletion = [];

    cursor.forEach((doc) => {
        console.log(doc)
        if (doc && (doc.name == prevDoc.name) && (doc.team == prevDoc.team)) {
            markedForDeletion.push(doc._id);
        }
        prevDoc = doc;

    }, () => {

        console.log(markedForDeletion);
        collection.deleteMany({ _id: { $in: markedForDeletion } }, function (err, response) {
            res.json(response);
        })


    })
});

module.exports = router;

