const config = require('config');
module.exports = function() {


    if (!config.get('jwtPrivateKey')) {
        //ensyre you assign a private key that willbe part of our json web token
        throw new Error('FATAL ERROR:jwtPrivateKey is not defined.');

    }

}