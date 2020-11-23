const news = require('./news.js');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use('/news', news);

app.listen(port, function() {
  console.log('Server running on port ', port);
});