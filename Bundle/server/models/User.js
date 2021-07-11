const mongoose = require("mongoose");
const UserSchema = require("../schemas/User");

let User = mongoose.model('user',UserSchema);

module.exports =  User;