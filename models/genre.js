const mongoose = require('mongoose'); //require mongoose
const Joi = require('joi');
const express = require('express');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    }
});
const Genre = mongoose.model('Genre', genreSchema);

function ValidateGenre(genre) {
    const schema = {
        name: Joi.string().min(4).required()
    };
    return Joi.validate(genre, schema);
}
exports.genreSchema = genreSchema;
exports.Validate = ValidateGenre;
exports.Genre = Genre;