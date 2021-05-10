const mongoose = require("mongoose");
const StockSchema = require("../schemas/Stock");

let Stock = mongoose.model('stock',StockSchema);

module.exports =  Stock;