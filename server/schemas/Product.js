const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : [{
        type : mongoose.Types.ObjectId,
        ref : 'category'
    }],
    description : {
        type:String
    }, 
    images : {
        type:Array
    },
    regularPrice : {
        type : Number,
        required:true
    },
    salePrice : {
        type : Number
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    isActive:{
        type : Boolean,
        default : true,
        required : true
    },
    sold:{
        type:Number,
        default:0,
        required:true
    },
    properties:[{
        type:{
            type:String
        },
        value:{
            type:String
        }
    }],
    productVideo:{
        type : String
    }
},{
    timestamps : true
}) 



module.exports = ProductSchema;