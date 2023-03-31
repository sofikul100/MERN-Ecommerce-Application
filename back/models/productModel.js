const { json } = require('body-parser');
const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
     name:{
        type:String,
        required:[true,'Plase enter product name'],
        trim:true
     },
     description:{
        type:String,
        required:[true,'Please enter product description'],
     },
     price:{
        required:[true,'Please enter product price'],
        type:Number,
        maxlength:[8,'Price cannot excced 8 characters']
     },
     ratings:{
        type:Number,
        default:0
     },
     image:[
        {
            public_id:{
                required:true,
                type:String
            },
            url:{
                type:String,
                required:true
            }
        }
     ],
     categorie:{
        type:String,
        required:[true,'Please enter product categorie']
     },
     stock:{
        type:Number,
        maxlength:[4,'Stock cannot excced 4 characters'],
        required:[true,'Please enter product stock']
     },
     numberOfReviws:{
        type:Number,
        default:0
     },
     reviws:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }

        }
     ],

     user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
     },
     createdAt:{
        type:Date,
        default:Date.now
     }


});





module.exports = mongoose.model('Product',productSchema);