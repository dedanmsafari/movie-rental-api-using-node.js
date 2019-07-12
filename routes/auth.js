const bcrypt = require('bcrypt'); //require the authentication package
const Joi = require('joi');
const _ = require('lodash');
const { User } = require('../models/user'); //require the us=[==[  er for authentication purposes
const express = require('express'); //require the express module
//require joi validation schema
const router = express.Router(); //use express router to route function
//create your validation schema for your data



router.post('/', async(req, res) => {

    const { error } = validate(req.body); //validate request of the body for authentication
    if (error) return res.status(400).send(error.details[0].message); //return the error message to the user

    let user = await User.findOne({ email: req.body.email }); //find the user by email for authentication.
    if (!user) return res.status(400).send('Invalid email or password.'); //if they return an invalid email..error.

    const validPassword = await bcrypt.compare(req.body.password, user.password); //if they return an invalid password error
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken(); //upon authenticating the user send him his json web token
    //the json web token is always stored on the client side
    res.send(token);
});

function validate(req) {
    const schema = {

        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;