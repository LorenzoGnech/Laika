const util = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/user");
const jwt = require('jsonwebtoken');
const router = express.Router();

ACCESS_TOKEN_SECRET='swsh23hjddnns'
ACCESS_TOKEN_LIFE=86400

router.post('', async (req, res) =>
{
    let newTempUser = {
        "email": req.body.email,
        "password": req.body.password,
    };

    if (!util.isUserCorrect(newTempUser))
    {
        res.status(400).send({ error: 'Object sent is not a user' });
    }
    else
    {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user){

            if (user.password != req.body.password)
                res.json({ error: 'Password mismatch' });
            
            // if user is found and password is right create a token
            var token = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
            console.log(token);
        
            res.json({
                success: true,
                email: user.email,
                message: 'Enjoy your token!',
                token: token
            });

        } else{
            res.status(400).send({ error: 'User not registered' });
        }

    }
});

module.exports = router;