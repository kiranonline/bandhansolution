const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    lineone : {
        type : String,
        required : true
    },
    locality:{
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    pincode : {
            type : Number,
            required : true
    },
    isdefault : {
        type : Boolean,
        default : false,
        required : true
    },
    isActive:{
        type: Boolean,
        required:true
    },
    user:{
        type : mongoose.Types.ObjectId,
        ref : 'user'
    }
},{
    timestamps : true
}) 



module.exports = AddressSchema;