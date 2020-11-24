const news = require('./news.js');
const astronauts = require('./astronauts.js');
const missions = require('./missions.js');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();

var port = process.env.PORT || 3000;

app.use(serveStatic(__dirname + "/Frontend/dist"));
app.use('/news', news);
app.use('/missions', missions)
app.use('/astronauts', astronauts);

app.listen(port, function() {
  console.log('Server running on port ', port);
});
