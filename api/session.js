var db = require('../db');
var createToken = require('../helpers/token-creator');

var express = require('express');
var router = express.Router();


router.post('/login', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }
  
  db.get().collection('users').findOne({ 
      username: req.body.username 
    }, function (err, user) {
        if(err) {
            return res.status('500').send('Internal server error.');
        }
        
        if (!user) {
            return res.status(401).send("The username or password don't match");
        }

        if (!(user.password === req.body.password)) {
            return res.status(401).send("The username or password don't match");
        }

        res.status(201).send({
            id_token: createToken(user)
        });
  });
}); 


module.exports = router;