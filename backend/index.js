const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.status(200).json("hello world")
})

app.use("/api/auth", require("./routes/auth.js"))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})