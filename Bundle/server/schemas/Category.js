const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    isActive:{
        type : Boolean,
        default : true,
        required : true
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },    
},{
    timestamps : true
}) 



module.exports = CategorySchema;