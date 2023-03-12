const { default: mongoose } = require('mongoose');
const Products = require('../models/Products');
const { verifySellerWithToken } = require('../muddlewares/checkTokens');
const route = require('express').Router()


route.get('/', async (req, res) => {
    let q = Products.find()
    const filter = []
    const Fagent = req.query.agent;
    const Fmaxp = req.query.maxp;
    const Fcat = req.query.cat;
    const limit = req.query.limit;
    console.log(req.query)

    if(limit) q.limit(limit)
    if(Fagent) filter.push({"agent._id" : Fagent})
    if(Fmaxp) filter.push({"price" : {$lt : Fmaxp}})
    if(Fcat) filter.push({"category" :  {$regex: Fcat, $options: "i"}})

    if(filter.length > 0){
        q = q.find({$and: filter})
    }

    try {
        const products = await q.exec();
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
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

route.post('/',verifySellerWithToken, async (req, res) => { 
    try {
        const products = await Products.create(req.body)
        res.status(200).json(products)
    } catch (error) {
        if(error.name === "ValidationError"){
            for(e in error.errors){
                return res.status(400).json({sucess: false,message: err.errors[e].message});
            }
        }
        res.status(500).json(error)
        res.status(500).json({message: "Internal server error"}) 
    }
})

module.exports = route;