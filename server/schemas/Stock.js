const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    seller:{
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    product:{
        type : mongoose.Types.ObjectId,
        ref : 'product'
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    isActive:{
        type : Boolean,
        default : true,
        required : true
    }
},{
    timestamps : true
}) 


module.exports = StockSchema;