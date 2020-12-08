var mongoose = require('mongoose');

const astronautsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    birth: Date,
    name: String,
    nationality: String,
    img_path: String,
    agency: String,
    tags: [String]   
});

module.exports = mongoose.model('astronauts', astronautsSchema, 'astronauts');