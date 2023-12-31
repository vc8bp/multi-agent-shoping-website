const mongoose = require('mongoose')
require("dotenv").config()

const connectToMongo = () => {
    mongoose.connect(process.env.DB_URI, {autoIndex: true}).then(() => {
        console.log("database connected sucessfully")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectToMongo;

