const util = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const News = require("./models/news");
const router = express.Router();

// GET METHODS

// GET all news.
router.get('', async (req, res) =>
{
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

// GET a specific news.
router.get('/:id', async (req, res) =>
{
    var id = req.params.id;
    News.findById(id)
    .exec()

    .then(doc => {
        console.log(doc);
        res.status(201).json(doc);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// GET all the latest added news.
router.get('/latest/:size', async (req, res) =>
{
    let size = req.params.size;
    let len = parseInt(size);

    if (len > 0)
    {    
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

// POST a new news. Requires authentication.
router.post('', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let newTempNews = {
        "date": "irrelevant", // dato che la imposta autonomamente il server
        "title": req.body.title,
        "content": req.body.content,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!util.isNewsCorrect(newTempNews))
    {
        res.status(400).send({ error: 'Object sent is not a news.' });
    }
    else
    {
        let newNews = new News({
            _id: mongoose.Types.ObjectId(),
            date: new Date(Date.now()).toISOString(),
            title: newTempNews.title,
            content: newTempNews.content,
            img_path: newTempNews.img_path,
            source_url: newTempNews.source_url,
            tags: newTempNews.tags
        });
        newNews.save()

        .then(result => {
            console.log(result);
            res.location("/api/v1/news/").status(201).send({
                insertedNews: newNews
            });
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
});

// DELETE an already present news. Requires authentication.
router.delete('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id;
    News.deleteOne({_id: id})
    .exec()

    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

// PUT an updated version of an already present news. Requires authentication.
router.put('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    let id = req.params.id; 
    let valuesToUpdate = {
        "date": new Date(Date.now()).toISOString(), // nessun bisogno di farlo dopo
        "title": req.body.title,
        "content": req.body.content,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": req.body.tags
    };

    if (!util.isNewsCorrect(valuesToUpdate))
    {
        res.status(400).send({ error: 'Object sent is not a news.' });
    }
    else
    {
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
    }
});

module.exports = router;