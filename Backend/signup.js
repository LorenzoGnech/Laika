const {isUserCorrect, dbErrorHandler} = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/user");
const { FALSE } = require('node-sass');
const router = express.Router();

router.post('', async (req, res) =>
{
    let newTempUser = {
        "email": req.body.email,
        "password": req.body.password,
        "is_admin": false,
    };
    if (!isUserCorrect(newTempUser))
    {
        res.status(400).send({ error: 'Object sent is not a user' });
    }
    else
    {
        let mailExists = await User.findOne({ email: req.body.email }).exec();
        if (!mailExists){
            let newUser = new User({
                _id: mongoose.Types.ObjectId(),
                email: newTempUser.email,
                password: newTempUser.password,
                is_admin: false
            });
            newUser.save()
            .then(result => {
                console.log(result);
                res.location("/").status(201).send({
                    insertedUser: newUser
                });
            })
            .catch(err => {
                let {errorCode, errorMsg} = dbErrorHandler(err);
            
                res.status(errorCode).json({
                    error: errorMsg
                });
            });
            
        } else{
            res.status(400).send({ error: 'User already registered' });
        }

    }
});

module.exports = router;