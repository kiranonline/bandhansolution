const User = require("../models/User");
const Product = require("../models/Product");
const Stock = require("../models/Stock");


//create stock for new seller
exports.createStockForNewSeller = async(sellerId)=>{
    try{
        let products = await Product.find({isActive:true}).select("_id").lean();
        let stocks = products.map((ele,i)=>{
            return({
                seller : sellerId,
                product : ele._id,
                stock:0,
                isActive:true
            })
        })
        Stock.insertMany(stocks).then((result)=>{
            console.log(result)
        }).catch((err)=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    } 
}


//create stock for new product
exports.createStockForNewProduct = async(productId)=>{
    try{
        let sellers = await User.find({isActive:true,userType:'seller'}).select("_id").lean();
        let stocks = sellers.map((ele,i)=>{
            return({
                seller : ele._id,
                product : productId,
                stock:0,
                isActive:true
            })
        })
        console.log(stocks)
        Stock.insertMany(stocks).then((result)=>{
            console.log(result)
        }).catch((err)=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    } 
}