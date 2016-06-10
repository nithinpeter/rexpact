var db = require('../db')

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  var collection = db.get().collection('movies')

  collection.find().toArray(function (err, docs) {
    if (err) {
      console.log('An error occurred white fetcing.')
      return;
    }

    res.json(docs);
  })
});

router.post('/', function (req, res) {
  console.dir(req.body);

  db.get().collection('movies').insertOne({
    title: req.body.title,
    year: req.body.year,
    rated: req.body.rated,
    released: req.body.released,
    runtime: req.body.runtime,
    genre: req.body.genre,
    director: req.body.director,
    writer: req.body.writer,
    actors: req.body.actors,
    plot: req.body.plot,
    language: req.body.language,
    awards: req.body.awards,
    poster: req.body.poster,
    mjScore: req.body.mjScore,
    mjRating: req.body.mjRating,
    mjVotes: req.body.mjVotes,
    mjId: req.body.mjId,
    type: req.body.type,
    url: req.body.url,
  }, function (err, result) {
    if (err) {
      console.log('An error occurred while inserting.')
      return;
    }

    res.status('201').send({message: 'Insert success.'});
  });
});

router.get('/:movieId', function (req, res) {
  var cursor = db.get().collection('movies').findOne({
    _id: parseInt(req.params.movieId)
  }, function (err, result) {
    if (err) {
      return res.status('500').send('An error occurred while fetching.');

    }
    res.json(result);
  });

});



module.exports = router;

