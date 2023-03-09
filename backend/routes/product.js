const { default: mongoose } = require('mongoose');
const Products = require('../models/Products');

const route = require('express').Router()

route.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: "Internal server error"}) 
    }
})

route.get('/:id', async (req, res) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)) return res.status(404).json({message: "this is not a valid product ID"})
    try {
        const products = await Products.findById(id);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: "Internal server error"}) 
    }
})

module.exports = route;