const Product = require('../models/productModel');
const catchAsyncErrors = require('../middlewares/catchAsyncEerrors');
const errorHandler = require('../utils/errorHandler');
const apiFeatures = require('../utils/apiFeatures')


//==-------------- get all products----------===//
exports.getAllProducts = catchAsyncErrors(async (req,res,next) =>{
      //---- for pagination-----//
      const resuptPerPage = 8;
      const apiFeature = new apiFeatures(Product.find(),req.query).search().filter();
      // ------- pagination------//
      apiFeature.pagination(resuptPerPage);
      const products = await apiFeature.query;
      if(products.length === 0){
        return next(new errorHandler('Product Not found'),400)
      }

      return res.status(200).json({
        'success':true,
        products
      })
})



//=------------- create product ---- access only admin-------==//
exports.createProduct = catchAsyncErrors(async(req,res,next) =>{
    // ** 10 **
     req.body.user = req.user.id;
     const product = await Product.create(req.body);
     if(!product){
      return  next(new errorHandler('Product create failed'),400)
     }
     return res.status(200).json({
        'success':true,
        'message':'Successfully product created',
        product
     })
})



//==-------------- get  product details -----------==//
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return  next(new errorHandler('Product delails Not found'),400)
    }

    return res.status(200).json({
        'success':true,
        product
    })
})



//====-------------- update product ---------access only admin --------===//
exports.updateProduct = catchAsyncErrors(async (req,res,next)  =>{
     const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new: true,
      runValidators: true,
      useFindAndModify: false,
     });
     return  next(new errorHandler('Product updated successfully'),200)
})


//===========-------------- delete product ------------- access only admin-----------//
exports.deleteProduct = catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.findById(req.params.id)
    product.delete();
    return res.status(200).json({
       'success':true,
       'message':'Successfully product deleted',
       product
    })
});


//================ create product review==========//

exports.createProductReview = catchAsyncErrors(async (req,res,next) =>{
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviws.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
        product.reviws.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())  (rev.rating = rating), (rev.comment = comment);
          });
    } else {
      product.reviws.push(review);
      product.numberOfReviws = product.reviws.length;
    }
  
    let avg = 0;
  
    product.reviws.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviws.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });

});

//=========== get all reviews of product ==============//
exports.getAllReviewsOfProduct = catchAsyncErrors(async (req,res,next) =>{
     const product = await Product.findById(req.query.id);
     
     if(!product){
        return next(new errorHandler("product not found",400));
     }

     return res.status(200).json({
        success:true,
        reviws:product.reviws
     })
});


//================ delete reviews of product ===========//

exports.deleteReview = catchAsyncErrors(async(req,res,next) =>{
     const product = await Product.findById(req.query.productId);
     
     if(!product){
        return next(new errorHandler("product not found",400));
     }

     const reviws = product.reviws.filter((rev) =>
        rev._id.toString() != req.query.id.toString()
    );

     let avg = 0;

     reviws.forEach((rev) =>{
        avg += rev.rating
     })

     let ratings = 0 ;

     if(reviws.length === 0){
        ratings = 0;
     }else{
        ratings = avg / reviws.length
     }

    const numberOfReviws = reviws.length;
    
    
    await Product.findByIdAndUpdate(req.query.productId,{
        reviws,
        ratings,
        numberOfReviws
    },{ 
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    return res.status(200).json({
        success:true,
        message:"successfully review deleted"
    })



     
})

