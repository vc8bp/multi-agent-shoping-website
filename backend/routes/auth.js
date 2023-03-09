const { createJWT } = require("../helpers/token");
const Agent = require("../models/Agent");
const User = require("../models/User");
const routes = require("express").Router();



//login route
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(402).json({message: "all feild's are required"})

  try {
    const user = await User.findOne({ email: email });
    if(!user) return res.status(404).json({ message: "No user found with this Email ID" });
    if (user.password !== password) return res.status(400).json({ message: "your password with this email dosent Matched" })

    const token = createJWT({id: user._id, isAdmin: user.isAdmin})
    
    const finalUser = {...user._doc, token}
    delete finalUser.password;
    res.status(200).json({...finalUser, token})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

routes.post("/register", async (req, res) => {
  const {email, password, name} = req.body
  if(!email || !password || !name) return res.status(402).json({message: "all feild's are required"})
  try {
    await User.create(req.body);
    res.status(200).json({ message: "register successfull" });
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      return res
        .status(401)
        .json({ message: "user with this email already exist" });
    }
    res.status(500).json({ message: "internal server error" });
  }
});

//Agent///////////////////////////////////////////////

routes.post("/agent/login", async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(402).json({message: "all feild's are required"})

  try {
    const user = await Agent.findOne({ email: email });
    if(!user) return res.status(404).json({ message: "No user found with this Email ID" });
    if (user.password !== password) return res.status(400).json({ message: "your password with this email dosent Matched" })

    const token = createJWT({id: user._id, isAdmin: user.isAdmin})
    
    const finalUser = {...user._doc, token}
    delete finalUser.password;
    res.status(200).json({...finalUser, token})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

routes.post("/agent/register", async (req, res) => {
  const {email, password, name, desc, number} = req.body
  if(!email || !password || !name || !desc || !number) return res.status(402).json({message: "all feild's are required"})
  try {
    await Agent.create(req.body);
    res.status(200).json({ message: "register successfull" });
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      return res
        .status(401)
        .json({ message: "user with this email already exist" });
    }
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = routes;
