const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Telescopes = require("./models/telescopes");



router.get('', async (req, res) => {
    Telescopes.find()
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
    Telescopes.findById(id)
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
    if (size <= telescopes.length){
        res.status(200).send(telescopes.slice(1, size+1));        
    } else {
        res.status(200).send(telescopes);
    }
});

router.post('', async (req, res) => {
    
    let telescope = new telescopes({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        launch_date: req.body.launch_date,
        img_path: req.body.img_path,
        source_url: req.body.source_url,
        tags: req.body.tags
    });
    telescope.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        insertedTelescope: telescope
    });
});

router.put('/:id', async (req, res) => {
    var id = req.params.id;
    
    let valuesToUpdate = {};
    valuesToUpdate.name = req.body.name;
    valuesToUpdate.description = req.body.description;
    valuesToUpdate.launch_date = req.body.launch_date;
    valuesToUpdate.img_path = req.body.img_path;
    valuesToUpdate.source_url = req.body.source_url;
    valuesToUpdate.tags = req.body.tags;

    Telescopes.updateOne({_id: id}, {$set: valuesToUpdate})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Telescope updated",
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