var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('News', new Schema({
    date: Date,
    tile: String,
    content: String,
    img_path: String,
    source_url: String,
    tags: [String]
}));