const mongoose = require('mongoose')
const { Schema } = mongoose;

const productsSchema = new Schema({
    title : {type: String, required: true},
    description : {type: String, required: true},
    img : {type: String, required: true},
    price : {type: Number, required: true},
    stock : {type: Number, required: true},
    agent: {
        name : {type: String, required: true},
        _id: {type: String, required: true}
    }
})

const Products = mongoose.model("products", productsSchema);
module.exports = Products;