const mongoose = require("mongoose");
const CartSchema = require("../schemas/Cart");

let Cart = mongoose.model('cart',CartSchema);

module.exports =  Cart;