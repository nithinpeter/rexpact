var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');

var url;
if(process.env.NODE_ENV == 'production')
    url = 'mongodb://' + process.env.DB_USER_NAME + ':'+ process.env.DB_PASSWORD + '@ds011251.mlab.com:11251/mallujunkies';
else
    url = 'mongodb://localhost:27017/mallunjunkies';
    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/movies', require('./api/movies'));
app.use('/api/info', require('./api/info'));
app.use('/api/session', require('./api/session'));

// Connect to Mongo on start
db.connect(url, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        console.log('Connected to Mongo server.')
        var port = process.env.PORT || 3100;
        app.listen(port, function () {
            console.log('Listening on port ' + port);
        })
    }
});