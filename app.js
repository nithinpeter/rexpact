import express from 'express';
import routes from './client/routes';

var app = express();


Object.keys(routes).map((key)=>{
  app.get(key, routes[key])
});

app.listen(4100, function () {
  console.log('Example app listening on port 4100!');
});