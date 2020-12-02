var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Telescopes', new Schema({
    name: String,
    description: String,
    launch_date: Date,
    img_path: String,
    source_url: String,
    tags: [String]
}));