var mongoose = require('mongoose');

const missionsSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    title: String,
    title_lowcase: [String],
    description: String,
    img_path: [String],
    source_url: String,
    tags: [String]
});

module.exports = mongoose.model('missions', missionsSchema, 'missions');