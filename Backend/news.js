const {isNewsCorrect, dbErrorHandler} = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const News = require("./models/news");
const FavouriteNews = require("./models/favourite_news");
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
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
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
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
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

// POST a new news. Requires authentication.
router.post('', async (req, res) =>
{
    // TO IMPLEMENT AUTH
    var tags_original = [req.body.tags];
    var tags_lower = [];
    tags_lower = [String(tags_original).split(",")];
    for (i in tags_original){
        tags_lower.push(tags_original[i].toLowerCase());
    }

    tags_lower = [tags_lower[1].split(",")][0];

    let newTempNews = {
        "date": "irrelevant", // dato che la imposta autonomamente il server
        "title": req.body.title,
        "content": req.body.content,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": tags_lower
    };

    if (!isNewsCorrect(newTempNews))
    {
        res.status(400).send({ error: 'Object sent is not a news.' });
    }
    else
    {
        let newNews = new News({
            _id: mongoose.Types.ObjectId(),
            date: new Date(Date.now()).toISOString(),
            title: newTempNews.title,
            title_lowcase: newTempNews.title.toLowerCase(),
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
            let {errorCode, errorMsg} = dbErrorHandler(err);
        
            res.status(errorCode).json({
                error: errorMsg
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
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
        });
    });
});

// PUT an updated version of an already present news. Requires authentication.
router.put('/:id', async (req, res) =>
{
    // TO IMPLEMENT AUTH

    var tags_original = [req.body.tags];
    var tags_lower = [];
    tags_lower = [String(tags_original).split(",")];
    for (i in tags_original){
        tags_lower.push(tags_original[i].toLowerCase());
    }

    tags_lower = [tags_lower[1].split(",")][0];

    let id = req.params.id; 
    let valuesToUpdate = {
        "date": new Date(Date.now()).toISOString(), // nessun bisogno di farlo dopo
        "title": req.body.title,
        "content": req.body.content,
        "img_path": req.body.img_path,
        "source_url": req.body.source_url,
        "tags": tags_lower
    };

    if (!isNewsCorrect(valuesToUpdate))
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

        .catch(err => {
            let {errorCode, errorMsg} = dbErrorHandler(err);
        
            res.status(errorCode).json({
                error: errorMsg
            });
        });
    }
});

// GET the favourite news of a user.

router.get('/favourite/:idUtente', async (req, res) =>
{
    let idUtente = req.params.idUtente;

    FavouriteNews.find({userId: idUtente})
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


// POST a new favourite news of a user

router.post('/favourite', async (req, res) =>
{
    let newTempFavouriteNews = {
        "newsId": req.body.newsId,
        "userId": req.body.userId
    };

    let newFavouriteNews = new FavouriteNews({
        _id: mongoose.Types.ObjectId(),
        newsId: newTempFavouriteNews.newsId,
        userId: newTempFavouriteNews.userId
    });
    newFavouriteNews.save()    
    .then(result => {
        console.log(result);
        // modificare location?
        res.location("/api/v1/missions").status(201).send({
            insertedFavouriteNews: newFavouriteNews
        });
    })
    .catch(err => {
        let {errorCode, errorMsg} = dbErrorHandler(err);
    
        res.status(errorCode).json({
            error: errorMsg
        });
    });
});

router.delete('/favourite/:userId/:newsId', async (req, res) =>
{
    let idUtente = req.params.userId;
    let idNews = req.params.newsId;

    FavouriteNews.deleteOne({$and: [{userId: idUtente}, {newsId: idNews}] })
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

module.exports = router;