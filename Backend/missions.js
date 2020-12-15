const {isMissionCorrect, dbErrorHandler} = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const Missions = require("./models/missions");
const MissionsUpdates = require("./models/missions_updates");
const MissionsFollowed = require("./models/missions_followed");
const router = express.Router();


// GET METHODS

// GET all missions.
router.get('', async (req, res) =>
{
    Missions.find()
    .exec()

    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })

    .catch(err => {
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
        });
    });
});

// GET a specific mission.
router.get('/:id', async (req, res) =>
{
    var id = req.params.id;
    Missions.findById(id)
    .exec()

    .then(doc => {
        console.log(doc);
        res.status(201).json(doc);
    })

    .catch(err => {
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
        });
    });
});

// GET all the latest added missions.
router.get('/latest/:size', async (req, res) =>
{
    let size = req.params.size;
    let len = parseInt(size);

    if (len > 0)
    {    
        Missions.find().sort({date: -1 }).limit(len)
        .exec()

        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })

        .catch(err => {
            let {errorCode, errorMsg} = dbErrorHandler(err);
        
            res.status(errorCode).json({
                error: errorMsg
            });
        });
    }
    else if (len === undefined)
    {
        res.status(400).json({
             error: 'Invalid lenght passed, must be an integer.'
        });
    }
    else
    {
        res.status(200).json(null);
    }
});

// POST, PUT and DELETE METHODS

// POST a new mission. Requires authentication.
router.post('', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    var tags_original = [req.body.tags];
    var tags_lower = [];
    tags_lower = [String(tags_original).split(",")];
    for (i in tags_original){
        tags_lower.push(tags_original[i].toLowerCase());
    }

    tags_lower = [tags_lower[1].split(",")][0];
    
    title_lowcase = req.body.title.toLowerCase();
    var lowlist = title_lowcase.split(" ");


    let newTempMission = {
        "date": new Date(Date.now(req.body.date)).toISOString(),
        "title": req.body.title,
        "title_lowcase": lowlist,
        "description": req.body.description,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": tags_lower
    };
    
    if (!isMissionCorrect(newTempMission))
    {
        res.status(400).send({ error: 'Object sent is not a mission.' });
    }
    else
    {
        let newMission = new Missions({
            _id: mongoose.Types.ObjectId(),
            date: new Date(Date.now(newTempMission.date)).toISOString(),
            title: newTempMission.title,
            title_lowcase: newTempMission.title_lowcase,
            description: newTempMission.description,
            img_path: newTempMission.img_path,
            source_url: newTempMission.source_url,
            tags: newTempMission.tags
        });
        newMission.save()

        .then(result => {
            console.log(result);
            res.location("/api/v1/missions/").status(201).send({
                insertedMission: newMission
            });
        })

        .catch(err => {
            let {errorCode, errorMsg} = dbErrorHandler(err);
        
            res.status(errorCode).json({
                error: errorMsg
            });
        });
    }
});


// POST 



// DELETE an already present mission. Requires authentication.
router.delete('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    Missions.deleteOne({_id: id})
    .exec()

    .then(result => {
        MissionsUpdates.deleteMany({missionId: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            let {errorCode, errorMsg} = dbErrorHandler(err);
        
            res.status(errorCode).json({
                error: errorMsg
            });
        });        
    })

    .catch(err => {
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
        });
    });
});

// PUT an updated version of an already present mission. Requires authentication.
router.put('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;

    var tags_original = [req.body.tags];
    var tags_lower = [];
    tags_lower = [String(tags_original).split(",")];
    for (i in tags_original){
        tags_lower.push(tags_original[i].toLowerCase());
    }

    tags_lower = [tags_lower[1].split(",")][0];
    
    title_lowcase = req.body.title.toLowerCase();
    var lowlist = title_lowcase.split(" ");

    let valuesToUpdate = {
        "date": new Date(Date.now(req.body.date)).toISOString(),
        "title": req.body.title,
        "title_lowcase": lowlist,
        "description": req.body.description,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": tags_lower
    };

    console.log(valuesToUpdate);

    if (!isMissionCorrect(valuesToUpdate))
    {
        res.status(400).send({ error: 'Object sent is not a mission.' });
    }
    else
    {
        valuesToUpdate.date = new Date(Date.parse(req.body.date)).toISOString();
    
        Missions.updateOne({_id: id}, {$set: valuesToUpdate})
        .exec()

        .then(result => {
            res.status(200).json({
                message: "Mission updated",
            });
        })

        .catch(err => {
            let {errorCode, errorMsg} = dbErrorHandler(err);
        
            res.status(errorCode).json({
                error: errorMsg
            });
        });
    }
});


router.get('/update/:id', async (req, res) =>
{
    let idMissione = req.params.id;

    MissionsUpdates.find({missionId: idMissione})
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
        });
    });
});


router.post('/update', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let newTempMissionUpdate = {
        "missionId": req.body.missionId,
        "content": req.body.content,
        "last_edit_date": new Date(Date.now())
    };

    let newMissionUpdate = new MissionsUpdates({
        _id: mongoose.Types.ObjectId(),
        missionId: newTempMissionUpdate.missionId,
        content: newTempMissionUpdate.content,
        last_edit_date: newTempMissionUpdate.insert_date
    });
    newMissionUpdate.save()
    
    .then(result => {
        console.log(result);
        // location da modificare?
        res.location("/api/v1/missions/").status(201).send({
            insertedMissionUpdate: newMissionUpdate
        });
    })

    .catch(err => {
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
        });
    });
});




router.put('/update/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    let updateTempMissionUpdate = {
        "content": req.body.content,
        "last_edit_date": new Date(Date.now())
    };
    
    MissionsUpdates.updateOne({_id: id}, {$set: updateTempMissionUpdate})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Mission update updated",
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});


router.delete('/update/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    MissionsUpdates.deleteOne({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});


router.get('/followed/:idUtente', async (req, res) =>
{
    let idUtente = req.params.idUtente;

    MissionsFollowed.find({userId: idUtente})
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.post('/followed', async (req, res) =>
{
    let newTempMissionFollowed = {
        "missionId": req.body.missionId,
        "userId": req.body.userId
    };

    let newMissionFollowed = new MissionsFollowed({
        _id: mongoose.Types.ObjectId(),
        missionId: newTempMissionFollowed.missionId,
        userId: newTempMissionFollowed.userId
    });
    newMissionFollowed.save()    
    .then(result => {
        console.log(result);
        res.location("/api/v1/missions").status(201).send({
            insertedMissionUpdate: newMissionFollowed
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.delete('/followed/:userId/:missionId', async (req, res) =>
{
    let idUtente = req.params.userId;
    let idMissione = req.params.missionId;

    MissionsFollowed.deleteOne({$and: [{userId: idUtente}, {missionId: idMissione}] })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;