const winston = require("winston");

module.exports = function(err, req, res, next) {
    //log the exception
    //error//warn//info/verbose/debug/silly
    const logger = winston.createLogger({
        level: "info",
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: "logfile.log" })
        ]
    });
    logger.error(err.message, err);
    // console.log('error', err.message, err);
    res.status(500).send("Something failed in the server");
};