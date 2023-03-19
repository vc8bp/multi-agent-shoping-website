const Agent = require('../models/Agent');

const router = require('express').Router()

router.get("/",async (req, res) => {
    let q = Agent.find();
    const filter = [];

    if(req.body.isVerified) filter.push({isVerified: false})

    if(filter.length > 0){
        q += q.find({$and: filter})
    }
    try {
        const agents = await q.exec()
        res.status(200).json(agents);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" });
    }
})

module.exports = router