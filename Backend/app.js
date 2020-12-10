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
const mongoose = require('mongoose');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();

var port = process.env.PORT || 3000;

// URL for DB connection
const DB_URI = "mongodb+srv://user:HoWTpgx6OOtFZUh3@laika.5s6t8.mongodb.net/laika?retryWrites=true&w=majority";

// Try to connect to DB
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

// Quando faremo login-sign up, dovremmo cambiare queste tre righe
// Perché altrimenti il verifier si mette in mezzo dicendoci che non
// abbiamo un token, quando il nostro obbiettivo è proprio ottenerne uno
/*app.post('', jwtVerifier);
app.delete('', jwtVerifier);
app.put('', jwtVerifier); */

app.post('/api/v1/news', jwtVerifier);
app.put('/api/v1/news', jwtVerifier);
app.delete('/api/v1/news', jwtVerifier);
app.use('/api/v1/news', news);

app.post('/api/v1/missions', jwtVerifier);
app.put('/api/v1/missions', jwtVerifier);
app.delete('/api/v1/missions', jwtVerifier);
app.use('/api/v1/missions', missions)

app.post('/api/v1/astronauts', jwtVerifier);
app.put('/api/v1/astronauts', jwtVerifier);
app.delete('/api/v1/astronauts', jwtVerifier);
app.use('/api/v1/astronauts', astronauts);

app.post('/api/v1/exoplanets', jwtVerifier);
app.put('/api/v1/exoplanets', jwtVerifier);
app.delete('/api/v1/exoplanets', jwtVerifier);
app.use('/api/v1/exoplanets', exoplanets);

app.post('/api/v1/telescopes', jwtVerifier);
app.put('/api/v1/telescopes', jwtVerifier);
app.delete('/api/v1/telescopes', jwtVerifier);
app.use('/api/v1/telescopes', telescopes);

app.use('/api/v1/search', search);
app.use('/api/v1/signup', signup);
app.use('/api/v1/signin', signin);

app.listen(port, function() {
  console.log('Server running on port ', port);
});

module.exports = app;