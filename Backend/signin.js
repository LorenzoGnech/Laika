const {isUserCorrect} = require('./utilities');
const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/user");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('', async (req, res) =>
{
    let newTempUser = {
        "email": req.body.email,
        "password": req.body.password,
    };

    if (!isUserCorrect(newTempUser))
    {
        res.status(400).send({ error: 'Object sent is not a user' });
    }
    else
    {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user)
        {
            if (user.password != req.body.password)
            {
                res.json({ error: 'Password mismatch' });
            }
            else
            {
                // if user is found and password is right create a token
                var token = jwt.sign(
                    { email: user.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: process.env.ACCESS_TOKEN_LIFE }
                );
                console.log(token);
            
            // if user is found and password is right create a token
            var token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
            console.log(token);
        
            res.json({
                success: true,
                email: user.email,
                message: 'Enjoy your token!',
                token: token,
                userId: user._id
            });
        }
        } else{

            res.status(400).send({ error: 'User not registered' });
        }
    }
});

module.exports = router;