const news = require('./news.js');
const astronauts = require('./astronauts.js');
const missions = require('./missions.js');
const exoplanets = require('./exoplanets.js')
const telescopes = require('./telescopes.js')
const signup = require('./signup.js')
const signin = require('./signin.js')
const search = require('./search.js')
const jwtVerifier = require('./jwtVerifier.js');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();

// Try to connect to DB


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,text/plain,*/*');
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(serveStatic(__dirname + "/Frontend/dist"));

// NEWS
app.post('/api/v1/news', jwtVerifier);
app.put('/api/v1/news', jwtVerifier);
app.delete('/api/v1/news', jwtVerifier);
app.use('/api/v1/news', news);

// MISSIONS
app.post('/api/v1/missions', jwtVerifier);
app.put('/api/v1/missions', jwtVerifier);
app.delete('/api/v1/missions', jwtVerifier);
app.use('/api/v1/missions', missions)

// ASTRONAUTS
app.post('/api/v1/astronauts', jwtVerifier);
app.put('/api/v1/astronauts', jwtVerifier);
app.delete('/api/v1/astronauts', jwtVerifier);
app.use('/api/v1/astronauts', astronauts);

// EXOPLANETS
app.post('/api/v1/exoplanets', jwtVerifier);
app.put('/api/v1/exoplanets', jwtVerifier);
app.delete('/api/v1/exoplanets', jwtVerifier);
app.use('/api/v1/exoplanets', exoplanets);

// TELESCOPES
app.post('/api/v1/telescopes', jwtVerifier);
app.put('/api/v1/telescopes', jwtVerifier);
app.delete('/api/v1/telescopes', jwtVerifier);
app.use('/api/v1/telescopes', telescopes);

app.use('/api/v1/search', search);
app.use('/api/v1/signup', signup);
app.use('/api/v1/signin', signin);

module.exports = app;