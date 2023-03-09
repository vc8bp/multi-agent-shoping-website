const mongoose = require('mongoose')
const URL = "mongodb+srv://vc8bp:12345@cluster0.jfdnuyg.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(URL, {autoIndex: true}).then(() => {
        console.log("database connected sucessfully")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectToMongo;

