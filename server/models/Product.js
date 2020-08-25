const mongoose = require("mongoose");
const ProductSchema = require("../schemas/Product");

let Product = mongoose.model('product',ProductSchema);

module.exports =  Product;