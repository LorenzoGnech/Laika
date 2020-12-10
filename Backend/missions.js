const util = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const Missions = require("./models/missions");
const MissionsUpdates = require("./models/missions_updates");
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
        console.log(err);
        res.status(500).json({
            error: err
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
        console.log(err);
        res.status(500).json({
            error: err
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
            console.log(err);
            res.status(500).json({
                error: err
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

    let newTempMission = {
        "date": req.body.date,
        "title": req.body.title,
        "description": req.body.description,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!util.isMissionCorrect(newTempMission))
    {
        res.status(400).send({ error: 'Object sent is not a mission.' });
    }
    else
    {
        let newMission = new Missions({
            _id: mongoose.Types.ObjectId(),
            date: new Date(Date.now(newTempMission.date)).toISOString(),
            title: newTempMission.title,
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
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
});

// POST 

router.post('/update/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let newTempMissionUpdate = {
        "missionId": req.params.id,
        "content": req.body.content,
        "insert_date": new Date(Date.now())
    };

    let newMissionUpdate = new MissionsUpdates({
        _id: mongoose.Types.ObjectId(),
        missionId: newTempMissionUpdate.missionId,
        content: newTempMissionUpdate.content,
        insert_date: newTempMissionUpdate.insert_date
    });
    newMissionUpdate.save()
    commentato per il momento
    .then(result => {
        console.log(result);
        // location da modificare?
        res.location("/api/v1/missions/").status(201).send({
            insertedMissionUpdate: newMissionUpdate
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    
});
// DELETE an already present mission. Requires authentication.
router.delete('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    Missions.deleteOne({_id: id})
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

// PUT an updated version of an already present mission. Requires authentication.
router.put('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    let valuesToUpdate = {
        "date": req.body.date,
        "title": req.body.title,
        "description": req.body.description,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!util.isMissionCorrect(valuesToUpdate))
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

        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
});

module.exports = router;