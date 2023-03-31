const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsyncErrors = require('../middlewares/catchAsyncEerrors');
const errorHandler = require('../utils/errorHandler');


//=========== create new order==========//
exports.createOrder = catchAsyncErrors(async (req,res,next) =>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        ItemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        ItemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(200).json({
        success:true,
        message:"successfully order created"
    })
})
//================= get single order ===========//
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) =>{
     
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new errorHandler("order not found in this id",400))
    }

    return res.status(200).json({
        success:true,
        order
    })

})

//=========== get loggedin user all orders ===============//

exports.myOrders = catchAsyncErrors(async (req,res,next) =>{
    const orders = await Order.find({ user:req.user._id });
    if(!orders){
        return next(new errorHandler("orders not found",400))
    }

    return res.status(200).json({
        success:true,
        orders
    })
});


//=============== get all orders (access only admin) ===================//
exports.getAllOrders = catchAsyncErrors(async (req,res,next) =>{
     const orders = await Order.find();

     if(!orders){
        return next(new errorHandler("order not found",400));
     }

     let totalAmount = 0;

     orders.forEach(order =>{
         totalAmount += order.totalPrice
     });

     return res.status(200).json({
        success:true,
        totalAmount,
        orders
     })

});

//============ update order status (access only admin)=============//

exports.updateOrderStatus = catchAsyncErrors(async (req,res,next) =>{
    const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new errorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "delivered") {
    return next(new errorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "delivered") {
    order.deliverAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message:`order successfully ${order.orderStatus}`
  });



});


async function updateStock (id,quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;


    await product.save({validateBeforeSave:false})
}



//================ deleteOrder (access only admin) ==================//


exports.deleteOrder = catchAsyncErrors(async (req,res,next) =>{
     const order = await Order.findById(req.params.id);

     if(!order){
        return next(new errorHandler("order not found",400))
     }

     await order.remove();

     return res.status(200).json({
        success:true,
        message:'succesfully order deleted'
     })
})