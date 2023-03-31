//********** 8 **********/
const catchAsyncEerrors = require('../middlewares/catchAsyncEerrors');
const errorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel")
exports.isAuthenticated = catchAsyncEerrors(async (req,res,next) =>{
    const {token} = req.cookies;
    if(!token){
        return next(new errorHandler('Plase login to access this resouces'),401)
    }

    const decodedData =jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    return next();
});
// ********* 9 ********//
exports.authorizeRole = (...roles) =>{
   return (req,res,next) =>{
      if(!roles.includes(req.user.role)){
        return next(new errorHandler(`Role: ${req.user.role} is not allowed to access this resouce`),401)
      }
      next();
   }
};