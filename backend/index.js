const express = require('express')
const connectToMongo = require('./database.js')
const cors = require('cors')
const Products = require('./models/Products.js')


const app = express()
app.use(express.json())
app.use(cors())
connectToMongo()
const port = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.status(200).json("hello world")
})

app.get("/test", async(req, res) => {
    try {
        const agents = await Products.aggregate([
          {
            $group: {
              _id: '$agent._id',
              name: { $first: '$agent.name' },
              numberOfProducts: { $sum: 1 },
            },
          },
        ]);
        res.json(agents);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/product", require("./routes/product.js"))
app.use("/api/agent", require("./routes/agents.js"))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})