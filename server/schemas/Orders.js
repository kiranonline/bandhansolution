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
        },
        seller:{
            type : mongoose.Types.ObjectId,
            ref : 'user'
        },
        stock:{
            type : mongoose.Types.ObjectId,
            ref : 'stock'
        },
        status:[{
            name:{
                type: String,
                default: "placed"
            },
            date:{
                type: Date,
                default: new Date()
            },
            remark:{
                type: String
            }
        }],
        price:{
            type: Number
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
        type: Object
    }
},{
    timestamps : true
}) 



module.exports = OrderSchema;