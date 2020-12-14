const express = require('express');
const {dbErrorHandler} = require('./utilities');
const mongoose = require('mongoose');
const Missions = require("./models/missions");
const Astronauts = require("./models/astronauts");
const News = require("./models/news");
const Telescopes = require("./models/telescopes");
const Exoplanets = require("./models/exoplanets");
const router = express.Router();

router.get('/missions/:query', async (req, res) => {
    
    var query = req.params.query
    query = query.toLowerCase();
    query = query.split("+")

    Missions.find({$or:[{tags:{$in:query}},{title:{$in:query}}]})   
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


router.get('/news/:query', async (req, res) => {
    
    var query = req.params.query
    query = query.toLowerCase();
    query = query.split("+")

    News.find({$or:[{tags:{$in:query}},{title:{$in:query}}]})   
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

router.get('/telescopes/:query', async (req, res) => {
    
    var query = req.params.query
    query = query.toLowerCase();
    query = query.split("+")

    Telescopes.find({$or:[{tags:{$in:query}},{name:{$in:query}}]})   
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

router.get('/exoplanets/:query', async (req, res) => {
    
    var query = req.params.query
    query = query.toLowerCase();
    query = query.split("+")

    Exoplanets.find({$or:[{tags:{$in:query}},{name:{$in:query}}]})   
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

router.get('/astronauts/:query', async (req, res) => {
    
    var query = req.params.query
    query = query.toLowerCase();
    query = query.split("+")

    Astronauts.find({$or:[{tags:{$in:query}},{name:{$in:query}}]})   
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

module.exports = router;