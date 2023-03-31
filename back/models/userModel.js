const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        trim:true,
        required:[true,"Please enter user name"],
        maxlength:[20,"user name cannot excced 20 characters"],
        minlength:[4,"user name should have more then 4 characters "]
     },

     email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Plase enter currect email"],
     },
     password:{
        type:String,
        required:[true,"Please enter your password"],
        select:false,
        maxlength:[25,"password cannot excced 25 characters"],
        minlength:[6,"password should have more then 6 characters"]
     },
     avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
     },
     role:{
        type:String,
        default:"user"
     },
     createdAt:{
        type:Date,
        default:Date.now
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date,
})

//******* 2 *********/
// =========---- password hashing functionlity----------========//
userSchema.pre("save",async function () {
   if(!this.isModified('password')){
       next();
   }
   
   this.password = await bcrypt.hash(this.password,10);

});


//****** 3 *******/
///====================---- generating jwttoken----------===//

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
       expiresIn:process.env.JWT_EXPIRE
    })
}

//****** 5 ********/
//==---------------- compare login password-----------========//

userSchema.methods.comparePassword = async  function (enteredPassword) {
   return await bcrypt.compare(enteredPassword,this.password)
}


//========generating token for password reset=========//




















module.exports = mongoose.model("User",userSchema)


