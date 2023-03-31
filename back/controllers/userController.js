const User = require("../models/userModel");
const catchAsyncEerrors = require("../middlewares/catchAsyncEerrors");
const errorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const SendEmail = require("../utils/SendMail");
const jwt = require("jsonwebtoken");
const { createTransport } = require("nodemailer");
const bcrypt = require('bcrypt')

//***** 1 ******/
exports.registerUser = catchAsyncEerrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "public id",
      url: "image url",
    },
  });

  //   const token = user.getJwtToken();

  //   return res.status(200).json({
  //      success:true,
  //      message:"successfully user registerd",
  //      token
  //   })
  //****** 6 *******/
  sendToken(user, 200, res);
});

//******* 4 *********/
//==========-------------------- login user method-------==========//

exports.loginUser = catchAsyncEerrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler("plase enter email and password"), 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorHandler("invalid email and password"), 401);
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new errorHandler("invalid email and password"), 401);
  }

  //   const token = user.getJwtToken();

  //   return res.status(200).json({
  //      success:true,
  //      message:"successfully logedin",
  //      token
  //   })
  //****** 6 *******/
  sendToken(user, 200, res);
});

//*********** 9 *************/
//==------------- logout functionlity--------//
exports.logout = catchAsyncEerrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "successfully logout",
  });
});

//------------ forgot password =--------//

//`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

exports.forgotPassword = catchAsyncEerrors(async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_SECRET;

      const token = jwt.sign({ userID: user._id }, secret, {
        expiresIn: "15m",
      });

      const url = `${process.env.BASE_URL}/api/v1/password/reset/${
        user._id
      }/${token}`;

      const text = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;

      const transpoter = createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transpoter.sendMail({
        from: process.env.SMTP_HOST,
        to: user.email,
        subject: `Ecommerce reset password`,
        text: text,
      });
      res.status(200).json({
        success: true,
        message: `Reset Token has been sent to ${user.email}`,
      });
    } else {
      return next(new errorHandler("Email doesn't exists",400))
    }
  } else {
    return next(new errorHandler("Email Field is Required",400))
  }
});

exports.resetPassword = catchAsyncEerrors( async (req, res, next) => {

  const { password, password_confirmation } = req.body;

  const { id, token } = req.params;
  const user = await User.findById(id);

  const new_secret = user._id + process.env.JWT_SECRET;

  try {
    jwt.verify(token, new_secret);

    if (password && password_confirmation) {
      if (password != password_confirmation) {
        return next(
          new errorHandler("password and confirm password does not match",400)
        );
      }else{
        const salt = await  bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password,salt);
        
        await User.findByIdAndUpdate(user._id,{$set:{password:newHashPassword}})
        res.status(200).json({
          success:true,
          message:'successfully password reset done'
        })
        sendToken(user,200,res)
      }
    }else{
      return next(new errorHandler("please enter password and confirm password",400))
    }


  } catch (e) {
    return next(new errorHandler(e, 500));
  }

});


//========== get user details============//

exports.getUserDetail = catchAsyncEerrors(async (req,res,next) =>{
   const user = await User.findById(req.user.id);

   return res.status(200).json({
      success:true,
      user
   })
})



//========== update user password =======//
exports.updatePassword = catchAsyncEerrors(async (req,res,next) =>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatch){
       return next(new errorHandler("password does not match",400))
    }

    if(req.body.newPassword != req.body.confirm_password){
       return next(new errorHandler('password and confirm password doesnot match'))
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res)
})



//====================== update profile ============//
exports.updateProfile = catchAsyncEerrors(async(req,res,next) =>{
   const newUserData = {
     name:req.body.name,
     email:req.body.email
   }

   //======= working with image cloudinary==//


   const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
     new:true,
     runValidators:true,
     useFindAndModify: false,
   });

   return res.status(200).json({
      success:true,
      message:'successfully profile updated'
   })


});



//=========== get all users (access only admin)==========//

exports.getAllUsers = catchAsyncEerrors(async (req,res,next) =>{
    const users = await User.find();

    if(!users){
       return next(new errorHandler("user not found",400))
    }

    return res.status(200).json({
      success:true,
      users
    })
});



//============ get single user (acccess only admin)========//

exports.getSingleUser = catchAsyncEerrors(async (req,res,next) =>{
   const user = await User.findById(req.params.id);

   if(!user){
     return next(new errorHandler("user doesnot exit",400))
   }

   return res.status(200).json({
      success:true,
      user
   })
});

//============= update user role (access only admin)===========//
exports.updateUserRole = catchAsyncEerrors(async (req,res,next) =>{
     const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
     }

     const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify: false,
     });

     return res.status(200).json({
       success:true,
       message:"User role updated successfully"
     })
})

//=============== delete user (access only admin) ========//

exports.deleteUser = catchAsyncEerrors(async (req,res,next) =>{
    const user = await User.findById(req.params.id);

    if(!user){
      return next(new errorHandler("user not exits in this id",400))
    }
    //========== delete user avatar from cloudinary later=========//
    await user.remove();
    return res.status(200).json({
      success:true,
      message:"successfully user deleted done"
    })
})