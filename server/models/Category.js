const mongoose = require("mongoose");
const CategorySchema = require("../schemas/Category");

let Category = mongoose.model('category',CategorySchema);

module.exports =  Category;