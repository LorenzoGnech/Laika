var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();
var port = process.env.PORT || 3000;

console.log(__dirname);

app.use(serveStatic(__dirname + "/Frontend/dist"));

// Handling GET requests
app.get('/ciao', function(req, res){ 
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Server running on port ', port);
});