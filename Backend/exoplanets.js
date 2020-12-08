const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Exoplanets = require("./models/exoplanets");


router.get('', async (req, res) => {
    Exoplanets.find()
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
    Exoplanets.findById(id)
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
        Exoplanets.find().sort({discover_date: -1 }).limit(len)
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
    
    var newexoplanet = new Exoplanets({
        _id: mongoose.Types.ObjectId(),
        discover_date: new Date(Date.parse(req.body.discover_date)).toISOString(),
        name: req.body.name,
        description: req.body.description,
        img_path: req.body.img_path,
        source_url: req.body.source_url,
        tags: req.body.tags
    });

    newexoplanet.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        insertedExoplanets: newexoplanet
    });
});


router.delete('/:id', async (req, res) => {
    var id = req.params.id;
    Exoplanets.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.put('/:id', async (req, res) => {
    var id = req.params.id;

    let valuesToUpdate = {};
    valuesToUpdate.discover_date = new Date(Date.parse(req.body.discover_date)).toISOString();
    valuesToUpdate.name = req.body.name;
    valuesToUpdate.description = req.body.description;
    valuesToUpdate.img_path = req.body.img_path;
    valuesToUpdate.source_url = req.body.source_url;
    valuesToUpdate.tags = req.body.tags;
    
    Exoplanets.updateOne({_id: id}, {$set: valuesToUpdate})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "News updated",
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