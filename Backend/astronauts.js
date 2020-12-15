const {isAstronautCorrect, dbErrorHandler} = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const Astronauts = require("./models/astronauts");
const AstronautsMissions = require("./models/astronauts_missions");
const router = express.Router();

// GET METHODS

// GET all astronauts.
router.get('', async (req, res) =>
{
    Astronauts.find()
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

// GET a specific astronaut.
router.get('/:id', async (req, res) =>
{
    let id = req.params.id;
    Astronauts.findById(id)
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

// GET all the latest added astronauts.
router.get('/latest/:size', async (req, res) =>
{
    let size = req.params.size;
    let len = parseInt(size);

    if (len > 0)
    {
        Astronauts.find().sort({ _id: -1 }).limit(len)
        .exec()

        .then(docs => {
            console.log(docs);
            res.status(201).json(docs);
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

// POST a new astronaut. Requires authentication.
router.post('', async (req, res) =>
{ 
    let newTempAstronaut = {
        "birth": req.body.birth,
        "name": req.body.name,
        //"name_lowcase": lowlist,
        "nationality": req.body.nationality,
        "img_path": req.body.img_path,
        "agency": req.body.agency,
        "tags": req.body.tags
    };
    
    if (!isAstronautCorrect(newTempAstronaut))
    {
        res.status(400).send({ error: 'Object sent is not an astronaut.' });
    }
    else
    {
        var tags_original = req.body.tags.split(",");
        var tags_lower = [];
        
        for (i in tags_original){
            tags_lower.push(tags_original[i].toLowerCase());
        }

        var img = req.body.img_path.split(",");

        let name_lowcase = req.body.name.toLowerCase();
        var lowlist = name_lowcase.split(" ");

        //tags_lower = [tags_lower[1].split(",")][0];
        //array_img = req.body.img_path;
        //array_img = [String(array_img).split(",")][0];
        
        let newAstronaut = new Astronauts({
            _id: mongoose.Types.ObjectId(),
            birth: new Date(Date.parse(newTempAstronaut.birth)).toISOString(),
            name: newTempAstronaut.name,
            name_lowcase: lowlist,
            nationality: newTempAstronaut.nationality,
            img_path: img,
            agency: newTempAstronaut.agency,
            tags: tags_lower
        });
        newAstronaut.save()

        .then(result => {
            console.log(result);
            res.location("/api/v1/astronauts/").status(201).send({
                insertedAstronaut: newAstronaut
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

// DELETE an already present astronaut. Requires authentication.
router.delete('/:id', async (req, res) =>
{
    let id = req.params.id;
    Astronauts.deleteOne({_id: id})
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

// PUT an updated version of an already present astronaut. Requires authentication.
router.put('/:id', async (req, res) =>
{
    let id = req.params.id;
    let valuesToUpdate = {
        "birth": req.body.birth,
        "name": req.body.name,
        //"name_lowcase": lowlist,
        "nationality": req.body.nationality,
        "img_path": req.body.img_path,
        "agency": req.body.agency,
        "tags": req.body.tags
    };
    
    if (!isAstronautCorrect(valuesToUpdate))
    {
        res.status(400).send({ error: 'Object sent is not an astronaut.' });
    }
    else
    {
        var tags_original = req.body.tags.split(",");
        var tags_lower = [];
        
        for (i in tags_original){
            tags_lower.push(tags_original[i].toLowerCase());
        }

        var img = req.body.img_path.split(",");

        let name_lowcase = req.body.name.toLowerCase();
        var lowlist = name_lowcase.split(" ");

        valuesToUpdate.birth = new Date(Date.parse(req.body.birth)).toISOString();
        valuesToUpdate.name_lowcase = lowlist;
        valuesToUpdate.tags = tags_lower;
        valuesToUpdate.img_path = img;
    
        Astronauts.updateOne({_id: id}, {$set: valuesToUpdate})
        .exec()
    
        .then(result => {
            res.status(200).json({
                message: "Astronaut updated",
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