var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    is_admin: Boolean
});

module.exports = mongoose.model('user', userSchema, 'user');