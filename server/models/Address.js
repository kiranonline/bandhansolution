const mongoose = require("mongoose");
const AddressSchema = require("../schemas/Address");

let Address = mongoose.model('address',AddressSchema);

module.exports =  Address;