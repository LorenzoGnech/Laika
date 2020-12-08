const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = require("./models/news");

router.get('', async (req, res) => {
    News.find()
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
    News.findById(id)
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
    var len = parseInt(size);

    if(len>0){    
        News.find().sort({date: -1 }).limit(len)
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
    }else{
        res.status(200).json(null);
    }
});

router.post('', async (req, res) => {
    
    let news = new News({
        _id: mongoose.Types.ObjectId(),
        date: new Date(Date.now()).toISOString(),
        title: req.body.title,
        content: req.body.content,
        img_path: req.body.img_path,
        source_url: req.body.source_url,
        tags: req.body.tags
    });
    news.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        insertedNews: news
    });
});

router.delete('/:id', async (req, res) => {
    var id = req.params.id;
    News.deleteOne({_id: id})
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

router.put('/:id', async (req, res) => {
    var id = req.params.id;
    
    let valuesToUpdate = {};
    valuesToUpdate.date = new Date(Date.now()).toISOString();
    valuesToUpdate.title = req.body.title;
    valuesToUpdate.content = req.body.content;
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