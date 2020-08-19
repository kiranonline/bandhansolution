const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    userType : {
        type : String,
        enum : ['customer','seller','admin'],
        default: 'customer'
    },
    isActive:{
        type : Boolean,
        default : true,
        required : true
    }
},{
    timestamps : true
}) 



UserSchema.methods.comparePassword = async function(password){
    try{
        let result = await bcrypt.compare(password, this.password);
        return result;
    }
    catch(err){
        throw err;
    }
}

module.exports = UserSchema;