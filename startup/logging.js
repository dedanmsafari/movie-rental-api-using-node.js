const winston = require('winston');
require('winston-mongodb');
require('express-async-errors'); //this module monkey patches try-catch blocks to every route handler
module.exports = function() {


    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );
    process.on('unhandledRejection', (ex) => {
        //   console.log('WE GOT AN UNHANDLED EXCEPTIION');
        // winston.error(ex.message, ex);
        //process.exit(1);
        throw ex;
    });

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/vidly',
        level: 'info'
    }));

}