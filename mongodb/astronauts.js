var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Astronauts', new Schema({
    first_name: String,
    last_name: String,
    birth_date: Date,
    nationality: String,
    agency: String
}));