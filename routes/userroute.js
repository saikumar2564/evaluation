const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/usermodel");
require("dotenv").config();
userRouter.get("/",(req,res)=>{
    res.send("Homepage")
})
// Registration

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body;
    try{
        const findUser = await UserModel.find({email});
        if(findUser.length==0)
        {
            bcrypt.hash(password, 5, async(err,hash)=>{
                const user = new UserModel({name,email,gender,password:hash,age,city});
                await user.save();
                res.send({"msg":"Registration Successfull"});
            })
        }
        else res.send({"msg":"User already exist, please login"})
    }
    catch(err){
        res.send({"error":err.message});
    }
});

// Login user

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const findUser = await UserModel.find({email});
        if(findUser.length!==0)
        {
            bcrypt.compare(password, findUser[0].password, async(err,result)=>{
                if(result)
                {
                    const token = jwt.sign({user:findUser[0]._id},process.env.JWT_SECREAT);
                    res.send({"msg":"Login Success", "token":token});
                }
                else{ res.send({"msg":"Wrong Credentials"}); }
            })
        }
        else res.send({"msg":"Please Register"});
    }
    catch(err){
        res.send({"error":err.message});
    }
});



module.exports = {
    userRouter,
}