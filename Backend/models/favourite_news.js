var mongoose = require('mongoose');

const favouriteNewsSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    newsId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('favourite_news', favouriteNewsSchema, 'favourite_news');