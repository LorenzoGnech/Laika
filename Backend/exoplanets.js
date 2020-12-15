const {isExoplanetCorrect, dbErrorHandler} = require('./utilities');
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
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
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
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
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

// POST a new exoplanet. Requires authentication.
router.post('', async (req, res) =>
{
    let newTempExoplanet = {
        "discover_date": req.body.discover_date,
        "name": req.body.name,
        //"name_lowcase": lowlist, // Non c'è bisogno di verificarlo, perché dipende da name.
        "description": req.body.description,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!isExoplanetCorrect(newTempExoplanet))
    {
        res.status(400).send({ error: 'Object sent is not an exoplanet.' });
    }
    else
    {
        var tags_original = req.body.tags.split(",");
        var tags_lower = [];

        for (i in tags_original){
            tags_lower.push(tags_original[i].toLowerCase());
        }
    
        //tags_lower = [tags_lower[1].split(",")][0];
    
        name_lowcase = req.body.name.toLowerCase();
        var lowlist = name_lowcase.split(" ");

        var newExoplanet = new Exoplanets({
            _id: mongoose.Types.ObjectId(),
            discover_date: new Date(Date.parse(newTempExoplanet.discover_date)).toISOString(),
            name: newTempExoplanet.name,
            name_lowcase: lowlist,
            description: newTempExoplanet.description,
            img_path: newTempExoplanet.img_path,
            source_url: newTempExoplanet.source_url,
            tags: tags_lower
        });
        newExoplanet.save()

        .then(result => {
            console.log(result);
            res.location("/api/v1/exoplanets/").status(201).send({
                insertedExoplanet: newExoplanet
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

// DELETE an already present exoplanet. Requires authentication.
router.delete('/:id', async (req, res) =>
{
    let id = req.params.id;
    Exoplanets.deleteOne({_id: id})
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
});

// PUT an updated version of an already present exoplanet. Requires authentication.
router.put('/:id', async (req, res) =>
{
    let id = req.params.id;
    let valuesToUpdate = {
        "discover_date": req.body.discover_date,
        "name": req.body.name,
        //"name_lowcase": lowlist, // Non c'è bisogno di verificarlo, perché dipende da name.
        "description": req.body.description,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };
    
    if (!isExoplanetCorrect(valuesToUpdate))
    {
        res.status(400).send({ error: 'Object sent is not an exoplanet.' });
    }
    else
    {
        var tags_original = req.body.tags;
        var tags_lower = [];

        for (i in tags_original){
            tags_lower.push(tags_original[i].toLowerCase());
        }
        
        name_lowcase = req.body.name.toLowerCase();
        var lowlist = name_lowcase.split(" ");

        valuesToUpdate.discover_date = new Date(Date.parse(req.body.discover_date)).toISOString();
        valuesToUpdate.tags = tags_lower;
        valuesToUpdate.name_lowcase = lowlist;
        valuesToUpdate.tags = tags_lower;
        
        Exoplanets.updateOne({_id: id}, {$set: valuesToUpdate})
        .exec()

        .then(result => {
            res.status(200).json({
                message: "Exoplanet updated",
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


module.exports = router;