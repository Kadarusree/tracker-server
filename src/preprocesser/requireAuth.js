const mongoose  = require('mongoose');
const jwt       = require('jsonwebtoken');
const User = mongoose.model('User');
const ResponseModel = require('../models/ResponseModel');


module.exports = (req, res, nextFunction) => {

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send(ResponseModel.error('You must be logged in', null, 401));
    }
    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.status(401).send(ResponseModel.error('Invalid Token/Credentials', err, 401));
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        nextFunction();
    });

};