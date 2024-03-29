const {isTelescopeCorrect, dbErrorHandler} = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const Telescopes = require("./models/telescopes");
const router = express.Router();

// GET METHODS

// GET all telescopes.
router.get('', async (req, res) =>
{
    Telescopes.find()
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

// GET a specific telescope.
router.get('/:id', async (req, res) =>
{
    var id = req.params.id;
    Telescopes.findById(id)
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

// GET all the latest added telescopes.
router.get('/latest/:size', async (req, res) =>
{
    let size = req.params.size;
    let len = parseInt(size);

    if (len > 0)
    {    
        Telescopes.find().sort({ launch_date: -1 }).limit(len)
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

// POST a new telescope. Requires authentication.
router.post('', async (req, res) =>
{
    let newTempTelescope = {
        "name": req.body.name,
        //"name_lowcase": lowlist,
        "description": req.body.description,
        "launch_date": req.body.launch_date,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!isTelescopeCorrect(newTempTelescope))
    {
        res.status(400).send({ error: 'Object sent is not a telescope.' });
    }
    else
    {
        var tags_original = req.body.tags.split(",");
        var tags_lower = [];
        
        for (i in tags_original){
            tags_lower.push(tags_original[i].toLowerCase());
        }

        let img = req.body.img_path.split(",");

        let name_lowcase = req.body.name.toLowerCase();
        var lowlist = name_lowcase.split(" ");

        let newTelescope = new Telescopes({
            _id: mongoose.Types.ObjectId(),
            name: newTempTelescope.name,
            name_lowcase: lowlist,
            description: newTempTelescope.description,
            launch_date: new Date(Date.parse(newTempTelescope.launch_date)).toISOString(),
            img_path: img,
            source_url: newTempTelescope.source_url,
            tags: tags_lower
        });
        newTelescope.save()

        .then(result => {
            console.log(result);
            res.location("/api/v1/telescopes/").status(201).send({
                insertedTelescope: newTelescope
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

// DELETE an already present telescope. Requires authentication.
router.delete('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    Telescopes.deleteOne({_id: id})
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

// PUT an updated version of an already present telescope. Requires authentication.
router.put('/:id', async (req, res) =>
{
    let id = req.params.id;
    let valuesToUpdate = {
        "name": req.body.name,
        //"name_lowcase": lowlist,
        "description": req.body.description,
        "launch_date": req.body.launch_date,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!isTelescopeCorrect(valuesToUpdate))
    {
        res.status(400).send({ error: 'Object sent is not a telescope.' });
    }
    else
    {
        var tags_original = req.body.tags.split(",");
        var tags_lower = [];
        
        for (i in tags_original){
            tags_lower.push(tags_original[i].toLowerCase());
        }

        let img = req.body.img_path.split(",");

        let name_lowcase = req.body.name.toLowerCase();
        var lowlist = name_lowcase.split(" ");

        valuesToUpdate.launch_date = new Date(Date.parse(req.body.launch_date)).toISOString();
        valuesToUpdate.name_lowcase = lowlist;
        valuesToUpdate.tags = tags_lower;
        valuesToUpdate.img_path = img;
    
        Telescopes.updateOne({_id: id}, {$set: valuesToUpdate})
        .exec()

        .then(result => {
            res.status(200).json({
                message: "Telescope updated",
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