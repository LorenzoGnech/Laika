var mongoose = require('mongoose');

const missionsUpdatesSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    missionId: mongoose.Schema.Types.ObjectId,
    content: String,
    insert_date: Date
});

module.exports = mongoose.model('missions_updates', missionsUpdatesSchema, 'missions_updates');