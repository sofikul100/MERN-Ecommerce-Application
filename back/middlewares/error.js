const errorHandler = require('../utils/errorHandler');


module.exports = (err,req,res,next) =>{
   this.statusCode = err.statusCode || 500;
   this.message = err.message || "internal server error"

 //==========---------------- Wrong Mongodb Id error -----===========//
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new errorHandler(message, 400);
  }
    // Mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new errorHandler(message, 400);
    }

  return res.status(this.statusCode).json({
     'success':false,
     message:err.message
  });
}