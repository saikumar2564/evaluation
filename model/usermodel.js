const mongoose = require("mongoose");

const userStuct = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    gender:{type:String, required:true},
    password:{type:String, required:true},
    age:{type:Number, required:true},
    city:{type:String, required:true},
    is_married:{type:Boolean}
},{
    versionKey:false
});

const UserModel = mongoose.model("user",userStuct);

module.exports = {
    UserModel,
}