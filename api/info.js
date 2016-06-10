var db = require('../db')

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.json({dbconnection: "success"});
});


module.exports = router;

