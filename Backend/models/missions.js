var mongoose = require('mongoose');

const missionsSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    title: String,
    description: String,
    img_path: String,
    source_url: String,
    tags: [Array]
});

module.exports = mongoose.model('missions', newsSchema, 'missions');