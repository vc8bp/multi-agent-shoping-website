const mongoose = require('mongoose');
const { findOneAndDelete } = require('../models/Products');
const Products = require('../models/Products');
const { SellerWithToken, verifyAdminWithToken, VerifiedSellerWithToken } = require('../muddlewares/checkTokens');
const route = require('express').Router()


route.get('/', async (req, res) => {
    //pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let q = Products.find()
    const filter = []
    const Fagent = req.query.agent;
    const Fmaxp = req.query.maxp;
    const Fcat = req.query.cat;
    console.log(req.query)

    if(limit) q.limit(limit)
    if(Fagent) filter.push({"agent._id" : Fagent})
    if(Fmaxp) filter.push({"price" : {$lt : Fmaxp}})
    if(Fcat) filter.push({"category" :  {$regex: Fcat, $options: "i"}})

    if(filter.length > 0) q = q.find({$and: filter})
    
  
    const countQ = filter.length > 0 ?  Products.find({$and: filter}) : Products.find();
    try {
        const products = await q.sort({_id: -1}).skip(skip).exec();
        const count = await countQ.countDocuments().exec();
        res.status(200).json({
            total: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            products,
        })
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



route.post('/', VerifiedSellerWithToken, async (req, res) => { 
    try {
        const agentName = req.body.agent
        const data = {...req.body, agent: {name: agentName, _id: req.user.id}}
        await Products.create(data)
        res.status(200).json({message: "Product Added successfully"})
    } catch (error) {
        if(error.name === "ValidationError"){
            for(e in error.errors){
                return res.status(400).json({sucess: false,message: error.errors[e].message});
            }
        }
        console.log(error)
        res.status(500).json({message: "Internal server error"}) 
    }
})

route.delete('/:id', VerifiedSellerWithToken, async (req, res) => { 
    const id = new mongoose.Types.ObjectId(req.params.id);

    if(!mongoose.isValidObjectId(id)) return res.status(404).json({message: "this is not a valid product ID"})
    try {
        const product = await Products.findOneAndDelete({$and : [{_id: id}, {"agent._id": req.user.id}]})
        if(!product) return res.status(404).json({message: "No Product forun with this ID"})
        res.status(200).json({message: "Product Deleted Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"}) 
    }
})


module.exports = route;