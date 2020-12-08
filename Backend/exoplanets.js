const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

//Da sistemare
router.get('/latest/:size', async (req, res) => {
    var size = req.params.size;
    if (size <= exoplanetsList.length){
        res.status(200).send(exoplanetsList.slice(0, size));
    } else {
        res.status(200).send(exoplanetsList);
    }
});

router.post('', async (req, res) => {
    
    let exoplanet = new News({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        discover_date: req.body.discover_date,
        img_path: req.body.img_path,
        source_url: req.body.source_url,
        tags: req.body.tags
    });
    exoplanet.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        insertedExoplanet: exoplanet
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
    })
});

router.put('/:id', async (req, res) => {
    var id = req.params.id;
    
    let valuesToUpdate = {};
    valuesToUpdate.name = req.body.name;
    valuesToUpdate.description = req.body.description;
    valuesToUpdate.discover_date = req.discover_date;
    valuesToUpdate.img_path = req.body.img_path;
    valuesToUpdate.source_url = req.body.source_url;
    valuesToUpdate.tags = req.body.tags;

    Exoplanets.updateOne({_id: id}, {$set: valuesToUpdate})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Exoplanet updated",
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