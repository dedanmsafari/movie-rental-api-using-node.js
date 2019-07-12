const bcrypt = require('bcrypt');
const { User, Validate } = require('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express'); //require the express module
//require joi validation schema
const router = express.Router(); //use express router to route function
//create your validation schema for your data

//me used for security reasons to prevent forgery of id and access unwarranted information
router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);

});

router.post('/', async(req, res) => {

    const { error } = Validate(req.body); //validate request of the body using joi.
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    //Save the user in the database
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});
module.exports = router;