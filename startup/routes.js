const express = require('express');

const error = require('../middleware/error');
const genres = require('../routes/genres'); //aquire the routes
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');


module.exports = function(app) {
    app.use(express.json()); //parse incoming data in json format
    app.use(express.urlencoded({ extended: true })); //parse strings and arrays of data
    app.use('/api/genres', genres); //if directory of genre display all genres
    app.use('/api/customers', customers); //if directory of customers display all customers
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    //in the event of an error this middle ware is executed last 
    app.use(error);

}