const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    cart : [{
        product:{
            type: mongoose.Types.ObjectId,
            required:true,
            ref : 'product'
        },
        count:{
            type: Number,
            required: true,
            default:1
        }
    }],
    user:{
        type : mongoose.Types.ObjectId,
        ref : 'user'
    }   
},{
    timestamps : true
}) 



module.exports = CartSchema;