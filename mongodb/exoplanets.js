var mongoose = require('mongoose');

var schema = mongoose.Schema;

module.exports = mongoose.model('exoplanets', new Schema({
    name: String,
    description: String,
    discover_date: Date,
    img_path: String,
    source_url: String,
    tags: [String]
}));
