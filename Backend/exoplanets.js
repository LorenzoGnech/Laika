const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Exoplanets = require("./models/exoplanets");

var exoplanetsList = [
    {
        "id": 1,
        "date": "21/10/2013",
        "name": "WASP-76b",
        "description": "WASP-76b is a hot Jupiter exoplanet discovered during 2013 that can be found in the constellation Pisces. It orbits a F-type star BD+01 316 (WASP-76) and has a size 0.92 that of Jupiter's mass.",
        "img": "",
        "source": "https://en.wikipedia.org/wiki/WASP-76b",
        "tags": ["nasa"],
    }, {
        "id": 2,
        "date": "15/04/2020",
        "name": "Kepler-1649c",
        "description": "Kepler-1649c is an exoplanet orbiting the M-type main sequence red dwarf star Kepler-1649, about 300 light-years from Earth, nằm trong chòm sao Thiên Nga.",
        "img": "",
        "source": "https://en.wikipedia.org/wiki/Kepler-1649c",
        "tags": ["kepler"],
    }
];

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
    if (size <= exoplanetsList.length){
        res.status(200).send(exoplanetsList.slice(0, size));
    } else {
        res.status(200).send(exoplanetsList);
    }
});

router.post('', async (req, res) => {
    
    var newexoplanet = new Exoplanets({
        _id: mongoose.Types.ObjectId(),
        discover_date: req.body.date,
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
    valuesToUpdate.discover_date = req.body.discover_date;
    valuesToUpdate.name = req.body.name;
    valuesToUpdate.description = req.body.description;
    valuesToUpdate.img_path = req.body.img_path;
    valuesToUpdate.source_url = req.body.source_url;
    valuesToUpdate.tags = req.body.tags;
    
    News.updateOne({_id: id}, {$set: valuesToUpdate})
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