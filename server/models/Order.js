const mongoose = require("mongoose")
const OrderSchema = require("../schemas/Orders");

module.exports = mongoose.model("order", OrderSchema);