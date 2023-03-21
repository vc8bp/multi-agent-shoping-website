const Agent = require('../models/Agent');
const {verifyAdminWithToken} = require("../muddlewares/checkTokens")
const router = require('express').Router()

router.get("/",async (req, res) => {
    let q = Agent.find();
    const filter = [];

    if(req.query.isVerified) filter.push({isVerified: false})
    if(filter.length > 0){
        q = q.find({$and: filter})
    }
    
    try {
        const agents = await q.exec()
        res.status(200).json(agents);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" });
    }
})

router.patch("/verify/:id", verifyAdminWithToken ,async (req, res) => {   
    const { isVerified } = req.body;
    const { id } = req.params
    try {
        if(isVerified){
            const agent = await Agent.findByIdAndUpdate(id, {$set: {isVerified: true}})
            res.status(200).json({message: `Agent ${agent.name} is Successfully Verified`});
        } else {
            const agent = await Agent.findById(id)
            res.status(200).json({message: `Agent ${agent.name} is Rejected Successfully, and his Document is also deleted`});
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" });
    }
})


module.exports = router