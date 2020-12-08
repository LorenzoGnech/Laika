const news = require('./news.js');
const astronauts = require('./astronauts.js');
const missions = require('./missions.js');
const exoplanets = require('./exoplanets.js')
const telescopes = require('./telescopes.js')
const search = require('./search.js')
const jwtVerifier = require('./jwtVerifier.js');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();

var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(serveStatic(__dirname + "/Frontend/dist"));

// Quando faremo login-sign up, dovremmo cambiare queste tre righe
// Perché altrimenti il verifier si mette in mezzo dicendoci che non
// abbiamo un token, quando il nostro obbiettivo è proprio ottenerne uno
/*app.post('', jwtVerifier);
app.delete('', jwtVerifier);
app.put('', jwtVerifier); */

app.use('/api/v1/news', news);
app.use('/api/v1/missions', missions)
app.use('/api/v1/astronauts', astronauts);
app.use('/api/v1/exoplanets', exoplanets);
app.use('/api/v1/telescopes', telescopes);
app.use('/api/v1/search', search);

app.listen(port, function() {
  console.log('Server running on port ', port);
});

module.exports = app;