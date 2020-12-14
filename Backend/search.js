const express = require('express');
const {dbErrorHandler} = require('./utilities');
const mongoose = require('mongoose');
const Missions = require("./models/missions");
const router = express.Router();

router.get('/:query', async (req, res) => {
    
    var query = req.params.query
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

module.exports = router;