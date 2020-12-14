const express = require('express');
const {dbErrorHandler} = require('./utilities');
const mongoose = require('mongoose');
const Missions = require("./models/missions");
const router = express.Router();

router.get('/:query', async (req, res) => {
    
    var query = req.params.query
    query = query.split("+")

    Missions.find({tags:{$in: query}})   
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
    
    res.status(200).send(query);
});

module.exports = router;