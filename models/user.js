const mongoose = require('mongoose'); //require mongoose
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        // pattern: /^[a-zA-Z0-9]{5}@*.com$/
    },
    //use joi password complexity to enforce complexity of passwords

    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,

    },
    isAdmin: Boolean,
});
//if you create an object that is part of a method you should not use an arrow function
//it becomes part of the usser schema
//information expert principle first
//user has enough information and expertise to handle all user related information.
//information encapsulated in user object
//method is part of the user object reference it using this and normal function syntax
userschema.methods.generateAuthToken = function() {

    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userschema);

function ValidateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}

exports.Validate = ValidateUser;
exports.User = User;