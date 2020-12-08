const util = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const Astronauts = require("./models/astronauts");
const router = express.Router();

router.get('', async (req, res) => {
    Astronauts.find()
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
    Astronauts.findById(id)
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
            console.log(err);
            res.status(500).status.json({
                error: err
            });
        });
    }
    else
    {
        res.status(200).json(null);
    }
});

// TO UPDATE
/*
router.get('/latest/:size', async (req, res) => {
    var size = req.params.size;
    if (size < astronauts.length){
        res.status(200).send(astronauts.slice(astronauts.length-size, size+1));        
    } else {
        res.status(200).send(astronauts);        
    }
}); */

router.post('', async (req, res) =>
{
    let newTempAstronaut = {
        "id": 0,
        "birth": req.body.birth,
        "name": req.body.name,
        "nationality": req.body.nationality,
        "img": req.body.img_path,
        "agency": req.body.agency
    }

    // Devo cambiare utilities.js, ma bisogna prima mergiare
    // con il main per evitare conflitti.
    /*
    if (!util.isAstronautCorrect(newTempAstronaut))
    {
        res.status(400).send({ error: 'object sent is not an astronaut' });
        next();
    } */
    
    let newAstronaut = new Astronauts({
        _id: mongoose.Types.ObjectId(),
        birth: newTempAstronaut.birth,
        name: newTempAstronaut.name,
        nationality: newTempAstronaut.nationality,
        img_path: newTempAstronaut.img,
        agency: newTempAstronaut.agency,
        tags: req.body.tags // sistemare prima utilities.js
    });

    newAstronaut.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    res.location("/api/v1/astronauts/").status(201).send({
        insertedAstronaut: newAstronaut
    });
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    Astronauts.deleteOne({_id: id})
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

router.put('/:id', async (req, res) =>
{
    let id = req.params.id;
    
    let valuesToUpdate = {
        "birth": req.body.birth,
        "name": req.body.name,
        "nationality": req.body.nationality,
        "img_path": req.body.img_path,
        "agency": req.body.agency,
        "tags": req.body.tags
    };

    Astronauts.updateOne({_id: id}, {$set: valuesToUpdate})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Astronaut updated",
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