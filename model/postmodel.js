const mongoose = require("mongoose");

const postStuct = new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true,unique:true},
    device:{type:String, required:true},
    no_of_comments:{type:Number, required:true},
    author:{type:String,required:true}
},{
    versionKey:false
});

const PostModel = mongoose.model("post",postStuct);

module.exports = {
    PostModel,
}