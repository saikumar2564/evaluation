// const { PostModel } = require("../model/postmodel");

const { PostModel } = require("../model/postmodel");

const postRouter = require("express").Router();

postRouter.post("/posts/add",async(req,res)=>{
    const data = req.body;
    try{
        const post = new PostModel(data);
        await post.save();
        res.send({"msg":"Successfully Added Post"});
    }
    catch(err){
        res.send({"error":err.message});
    }
})

postRouter.get("/posts",async(req,res)=>{
    const {author} = req.body
    try{
        const posts = await PostModel.find({author});
        if(posts.length > 0)
        {
            res.send(posts);
        }
        else res.send({"msg":"You've Not Posted Anything Yet"});
    }
    catch(err){
        res.send({"error":err.message});
    }
});


postRouter.get("/posts/top",async(req,res)=>{
    const {author} = req.body
    try{
        const posts = await PostModel.find({author}).sort({no_of_comments:-1}).limit(1);
        if(posts.length > 0)
        {
            res.send(posts);
        }
        else res.send({"msg":"You've Not Posted Anything Yet"});
    }
    catch(err){
        res.send({"error":err.message});
    }
});

postRouter.patch("/posts/update/:id",async(req,res)=>{
    const {id} = req.params;
    const payload = req.body;
    try{
        const posts = await PostModel.find({_id:id});
        if(posts.length > 0)
        {
            await PostModel.findByIdAndUpdate({_id:id},payload);
            res.send({"msg":"Successfully Updated"});
        }
        else res.send({"msg":"Post Does't Exist"});
    }
    catch(err){
        res.send({"error":err.message});
    }
});

postRouter.delete("/posts/delete/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const posts = await PostModel.find({_id:id});
        if(posts.length > 0)
        {
            await PostModel.findByIdAndDelete({_id:id});
            res.send({"msg":"Successfully Deleted"});
        }
        else res.send({"msg":"Post Does't Exist"});
    }
    catch(err){
        res.send({"error":err.message});
    }
});

module.exports = {
    postRouter,
}