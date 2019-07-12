//Acquire all necessary modules and paths to other modules
const Joi = require('joi'); //validation module
Joi.objectId = require('joi-objectid')(Joi); //ensures id is a 24 bit alphanumeric character
const winston = require('winston');
const express = require('express'); //another dependencies
const app = express(); //express framework ini
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/connections')();
require('./startup/configurations')();
require('./startup/validation')();
//process.on('uncaughtException', (ex) => {
//  console.log('WE GOT A N UNCAUGHT EXCEPTIION');
//winston.error(ex.message, ex);
//process.exit(1);

//});

//throw new Error('Something failed during startup');

//const p = Promise.reject(new Error('Something failed miserably!'));
//p.then(() => console.log('Done'));
const port = process.env.PORT || 3000; //set variable for the listening ports
app.listen(port, () => winston.info(`Listening on port ${port}...`));