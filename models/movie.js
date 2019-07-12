const mongoose = require('mongoose'); //require mongoose
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: Joi.objectId,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {

        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255

    }
}));

function ValidateGenre(movie) {
    const schema = {
        title: Joi.objectId().min(4).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}

exports.Validate = ValidateGenre;
exports.Movie = Movie;