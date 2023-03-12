const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.token.split(" ")[1];
    if(!token) return res.status(401).json({messgae: "You are not loged in"})

    jwt.verify(token, process.env.JWT_TOKEN_SECRATE ,(err, user) => {
        if(err) return res.status(403).json({message: "token in not valid"});
        if(user) {
            req.user = user;
            next()
        }
    });
}

const verifyAdminWithToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin !== true) return res.status(403).json({message: "you are not allowed to do thet"});
        next()
    })
}

const verifySellerWithToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isSeller !== true) return res.status(403).json({message: "you are not allowed to do thet"});
        next()
    })
}
module.exports = {verifyToken, verifyAdminWithToken, verifySellerWithToken};