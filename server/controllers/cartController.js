const Cart = require("../models/Cart");
const Stock = require("../models/Stock");
const mongoose = require("mongoose");


exports.addtocart = async(req,res,next) =>{
    try{
        const product_id = req.body.product_id;
        const user_id = req.user._id;
        const pincode = req.user.defaultAddress.address.pincode;
        // console.log(user_id);

        let match_1={};
        let lookup={};
        let match_2={};

        match_1.product = mongoose.Types.ObjectId(product_id);
        match_1.stock = {$gt:0};

        lookup.from = "users";
        lookup.localField = "seller";
        lookup.foreignField = "_id";
        lookup.as = "seller_details";

        match_2.pincode = {$in: "$seller_details.$deliverTo"};

        const query = [
            {$match:match_1},
            {$lookup:lookup},
            {$unwind:"$seller_details"},
            {$match:{
                "seller_details.deliverTo":{$in:[pincode]}
            }}            
        ]
        // console.log(query);

        let seller = await Stock.aggregate(query);
        if(seller.length>0){
            let cart_d = await Cart.find({user:mongoose.Types.ObjectId(user_id),"cart.product" : {$in:[product_id]}});
            let cart_details = await Cart.findOneAndUpdate({user:mongoose.Types.ObjectId(user_id),"cart.product" : {$in:[product_id]}},{
                $inc: {"cart.$.count":1}
            },{
                new:true
            });
            console.log(cart_details);
            if(cart_details){
                res.json({
                    status:true,
                    data:cart_details
                })
            }else{
                //New cart item created.

                let new_cart = new Cart({
                    user : user_id,
                    cart : {
                        count:1,
                        product: product_id
                    }
                })
                await new_cart.save();
                res.json({
                    status: true,
                    data: new_cart
                })
            }
            
        }else{
            res.json({
                status:false,
                message:"No seller is delivering to your pincode"
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            status: true,
            message:"Server Error"
        })
    }
}