var mongoose = require('mongoose');

var schema = mongoose.Schema;

module.exports = mongoose.model('missions', new Schema({
    date: Date,
    title: String,
    description: String,
    img_path: String,
    source_url: String,
    tags: [Array]
}));