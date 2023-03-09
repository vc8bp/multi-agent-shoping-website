const express = require('express')
const connectToMongo = require('./database.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
connectToMongo()
const port = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.status(200).json("hello world")
})

app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/product", require("./routes/product.js"))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})