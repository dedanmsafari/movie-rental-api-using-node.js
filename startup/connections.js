const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true }) //connection to db
        .then(() => winston.info('Connected to Mongodb...'))

}