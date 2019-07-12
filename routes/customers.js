const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth');
const express = require('express'); //require the express module
//require joi validation schema
const router = express.Router(); //use express router to route function
//create your validation schema for your data




router.get('/', auth, async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});
router.get('/:id', auth, async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    // const Customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('Movie Customer does not exist')
    res.send(customer);
});
router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});
router.put('/:id', auth, async(req, res) => {
    //Validate first before updating the data
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!customer) return res.status(404).send('Movie Customer not found')


    res.send(customer);

});
router.delete('/:id', auth, async(req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('Movie Customer not found')


    res.send(customer);

});


module.exports = router; //router object to be exported