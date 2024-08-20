
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false});


const userModel = mongoose.model("User",userSchema);

module.exports = userModel;

