const mongoose = require("mongoose");


// there will be three states of orders placed, delivered, cancelled
const OrderSchema = new mongoose.Schema({
    items : [{
        product:{
            type: mongoose.Types.ObjectId,
            required:true
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
    },
    totalCost: {
        type: Number,
    },
    currentStatus: {
        type: String,
        default: "placed"
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'address'
    }
},{
    timestamps : true
}) 



module.exports = OrderSchema;