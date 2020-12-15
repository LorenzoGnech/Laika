var mongoose = require('mongoose');

const telescopesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    name_lowcase: [String],
    description: String,
    launch_date: Date,
    img_path: [String],
    source_url: String,
    tags: [String]   
});

module.exports = mongoose.model('telescopes', telescopesSchema, 'telescopes');