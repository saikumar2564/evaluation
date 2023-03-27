const express=require("express")
const { connection } = require("./configs/db")
const { authenticate } = require("./middlewares/authenticate.middleware")
const { postRouter } = require("./routes/postroute")

const { userRouter } = require("./routes/userroute")
const app=express()
app.use(express.json())


app.use("/users",userRouter)
app.use(authenticate)
app.use("/",postRouter)

app.listen(process.env.port,async(req,res)=>{
    try{
     await connection
     // res.send("connected to db")
     console.log("connected to db")
    }
    catch(err){
     console.log(err)
     // res.send("err")
    }
    console.log("server is running at 8000")
 })