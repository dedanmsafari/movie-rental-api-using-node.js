const Joi = require('joi'); //validation module
module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi); //ensures id is a 24 bit alphanumeric character

}