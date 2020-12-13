var mongoose = require('mongoose');

const missionsfollowedSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    missionId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('missions_followed', missionsfollowedSchema, 'missions_followed');