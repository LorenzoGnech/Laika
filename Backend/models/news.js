var mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    title: String,
    content: String,
    img_path: String,
    source_url: String,
    tags: [String]   
});

module.exports = mongoose.model('news', newsSchema, 'news');