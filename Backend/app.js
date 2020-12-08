const news = require('./news.js');
const astronauts = require('./astronauts.js');
const missions = require('./missions.js');
const exoplanets = require('./exoplanets.js');
const telescopes = require('./telescopes.js');
const prova = require("./prova.js");
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();

var port = process.env.PORT || 3000;

const DB_URI = "mongodb+srv://admin:laika2020@laika.5s6t8.mongodb.net/laika?retryWrites=true&w=majority";

try {
    mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
}catch (error) { 
    console.log("could not connect");    
}


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


app.use('/api/v1/news', news);
app.use('/api/v1/missions', missions)
app.use('/api/v1/astronauts', astronauts);
app.use('/api/v1/exoplanets', exoplanets);
app.use('/api/v1/telescopes', telescopes);
app.use('/api/v1/prova', prova);

app.listen(port, function() {
  console.log('Server running on port ', port);
});