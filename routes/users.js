const mongoose=require("mongoose")
const plm=require('passport-local-mongoose')
const userSchema=mongoose.Schema({
  username:String,
  name:String,
  email:String,
  password:String,
  profileImage:String,
  contact:Number
})
userSchema.plugin(plm);
module.exports=mongoose.model("User",userSchema)