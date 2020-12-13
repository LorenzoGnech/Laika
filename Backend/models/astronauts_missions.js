var mongoose = require('mongoose');

const astronautsMissionsSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    astronautsId: mongoose.Schema.Types.ObjectId,
    missionId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('astornauts_missions', astronautsMissionsSchema, 'astornauts_missions');