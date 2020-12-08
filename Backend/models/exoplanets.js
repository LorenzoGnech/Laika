var mongoose = require('mongoose');

const exoplanetsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    discover_date: Date,
    img_path: String,
    source_url: String,
    tags: [String]   
});

module.exports = mongoose.model('news', exoplanetsSchema, 'news');