const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Missions = require("./models/missions");


router.get('', async (req, res) => {
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


router.get('/:id', async (req, res) => {
    var id = req.params.id;
    Missions.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(201).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).status.json({
            error: err
        });
    });
});

router.get('/latest/:size', async (req, res) => {
    var size = req.params.size;
    var len = parseInt(size);

    if(len>0){    
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
    }else{
        res.status(200).json(null);
    }
});


router.post('', async (req, res) => {
    
    let mission = new Missions({
        _id: mongoose.Types.ObjectId(),
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        img_path: req.body.img_path,
        source_url: req.body.source_url,
        tags: req.body.tags
    });
    mission.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        insertedMission: mission
    });
});

router.delete('/:id', async (req, res) => {
    var id = req.params.id;
    Missions.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

router.put('/:id', async (req, res) => {
    var id = req.params.id;
    
    let valuesToUpdate = {};
    valuesToUpdate.date = req.body.date;
    valuesToUpdate.title = req.body.title;
    valuesToUpdate.description = req.body.description;
    valuesToUpdate.img_path = req.body.img_path;
    valuesToUpdate.source_url = req.body.source_url;
    valuesToUpdate.tags = req.body.tags;

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
});

module.exports = router;