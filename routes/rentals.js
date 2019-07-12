const { Rental, Validate } = require('../models/rental'); //acquire the rental schema and validate  from rental module
const { Movie } = require('../models/movie'); //acquire the movie schema   from movie module
const { Customer } = require('../models/customer'); //acquire the customer schema
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort('-dateOut'); //sort the date in descending order
    res.send(rentals);
});

router.post('/', auth, async(req, res) => {
    const { error } = Validate(req.body); //validate the input being given by the user.
    if (error) return res.status(400).send(error.details[0].message); //return error message if problem with the body of the request

    const customer = await Customer.findById(req.body.customerId); //find a customer based on his ID
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId); //find a movie based on the ID
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.'); //conditional statement for goods not in stock

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    //Implement two phase commit transactions
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();
        res.send(rental);

    } catch (ex) {

        res.status(500).send('something went wrong');
    }
    //rental = await rental.save();

    // movie.numberInStock--; //outodecrement the number of movies in the stock with every rental
    //movie.save();

    // res.send(rental);
});

router.get('/:id', async(req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

module.exports = router;