const express = require('express');
const mongoose = require('mongoose');
const ResponseModel = require('../models/ResponseModel');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();


authRouter.post('/signup', async (req, res) => {
    console.log(JSON.stringify(req.body));
    if (!req.body.email || !req.body.password) {
        return res.status(400).send(ResponseModel.error('Email and password are required', null, 400));
    }

    const email = req.body.email;
    const password = req.body.password;
    const user = new User({ email, password });
    await user.save()
        .then(() => {            
            const token = jwt.sign({ userId: user._id}, "MY_SECRET_KEY");
            res.status(201).send(ResponseModel.success({
                user : user,
                token : token
            }, 'User created successfully', 201));
        })
        .catch((err) => {
            res.status(500).send(ResponseModel.error('Internal error2', err, 500));
        });
    
});


authRouter.post('/signin', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send(ResponseModel.error('Email and password are required', null, 400));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send(ResponseModel.error('No User Found with given email', null, 404));
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id}, "MY_SECRET_KEY");
        res.send(ResponseModel.success({
            user : user.email,
            token : token
        }, 'Logged in successfully ', 200));
    } catch (err) {
        return res.status(401).send(ResponseModel.error('Invalid password', null, 401));
    }
});
module.exports = authRouter;