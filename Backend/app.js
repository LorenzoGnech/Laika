const news = require('./news.js');
const astronauts = require('./astronauts.js');
const missions = require('./missions.js');
const exoplanets = require('./exoplanets.js')
const telescopes = require('./telescopes.js')
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(serveStatic(__dirname + "/Frontend/dist"));
app.use('/api/v1/news', news);
app.use('/api/v1/missions', missions)
app.use('/api/v1/astronauts', astronauts);
app.use('/api/v1/exoplanets', exoplanets);
app.use('/api/v1/telescopes', telescopes);

app.listen(port, function() {
  console.log('Server running on port ', port);
});