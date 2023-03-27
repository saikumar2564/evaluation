const jwt = require("jsonwebtoken");
const { PostModel } = require("../model/postmodel")
require("dotenv").config();

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    try{
        jwt.verify(token, process.env.JWT_SECREAT, (err,decoded)=>{
            if(err) res.send({"error":"Please Login"});
            else {
                req.body.author = decoded.user;
                next();
            }
        });
    }
    catch(err){
        res.send({"error":err.message});
    }
}

module.exports = {
    authenticate
}