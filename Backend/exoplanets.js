const util = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const Exoplanets = require("./models/exoplanets");
const router = express.Router();

// GET METHODS

// GET all exoplanets.
router.get('', async (req, res) =>
{
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

// GET a specific exoplanet.
router.get('/:id', async (req, res) =>
{
    var id = req.params.id;
    Exoplanets.findById(id)
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

// GET all the latest added exoplanets.
router.get('/latest/:size', async (req, res) =>
{
    let size = req.params.size;
    let len = parseInt(size);

    if (len > 0)
    {    
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

// POST a new exoplanet. Requires authentication.
router.post('', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let newTempExoplanet = {
        "discover_date": req.body.discover_date,
        "name": req.body.name,
        "description": req.body.description,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!util.isExoplanetCorrect(newTempExoplanet))
    {
        res.status(400).send({ error: 'Object sent is not an exoplanet.' });
    }
    else
    {
        var newExoplanet = new Exoplanets({
            _id: mongoose.Types.ObjectId(),
            discover_date: new Date(Date.parse(newTempExoplanet.discover_date)).toISOString(),
            name: newTempExoplanet.name,
            description: newTempExoplanet.description,
            img_path: newTempExoplanet.img_path,
            source_url: newTempExoplanet.source_url,
            tags: newTempExoplanet.tags
        });
        newExoplanet.save()

        .then(result => {
            console.log(result);
            res.location("/api/v1/exoplanets/").status(201).send({
                insertedExoplanet: newExoplanet
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

// DELETE an already present exoplanet. Requires authentication.
router.delete('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    Exoplanets.deleteOne({_id: id})
    .exec()

    .then(result => {
        console.log(result);
        res.status(200).json(result); // non mi piace...
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// PUT an updated version of an already present exoplanet. Requires authentication.
router.put('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    let valuesToUpdate = {
        "discover_date": req.body.discover_date,
        "name": req.body.name,
        "description": req.body.description,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!util.isExoplanetCorrect(valuesToUpdate))
    {
        res.status(400).send({ error: 'Object sent is not an exoplanet.' });
    }
    else
    {
        valuesToUpdate.discover_date = new Date(Date.parse(req.body.discover_date)).toISOString();
        
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
    }
});


module.exports = router;