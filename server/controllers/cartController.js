const Stock = require("../models/Stock");
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const { update } = require("../models/Stock");



//shubham


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
            let cart_d = await Cart.findOne({user:mongoose.Types.ObjectId(user_id)});
            if(cart_d){
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
                    //update the cart array with new object
                    let updated_cart = await Cart.findOneAndUpdate({user:mongoose.Types.ObjectId(user_id)},{
                        $push:{"cart":{
                            count:1,
                            product:product_id
                        }}
                    },{new:true})
                    console.log(updated_cart);
                    if(updated_cart){
                        res.json({
                            status: true,
                            data: updated_cart
                        })
                    }
                }

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


exports.fetchcart = async(req,res,next) => {
    //Problem in fetching in cart array.
    try{
        const user_id = req.user._id;
        console.log(user_id)
        let query = [];

        query = [
            {$match: {user: user_id}},            
            {$lookup: {
                from :"products",
                localField: "cart.product",
                foreignField: "_id",
                as: "product_details"
            }}
        ]

        // console.log(query);
        const cart_details = await Cart.aggregate(query);
        if(cart_details && cart_details.length>0){
            // console.log(cart_details[0].product_details);
            res.json({
                status:true,
                data: cart_details
            })
        }else{
            res.json({
                status:false,
                message: "No product in the cart."
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            status:false,
            message: "Server Error"
        })
    }
}

exports.removecartitem = async(req,res,next)=>{
    try{
        const user_id = req.user._id;
        const product_id = req.body.product_id;

        let cart_details = await Cart.findOne({user:user_id, "cart.product" : {$in:[product_id]}});
        console.log(cart_details);
        if(cart_details){
            if(cart_details.cart[0].count>1){
                let updated_cart = await Cart.findOneAndUpdate({user:user_id, "cart.product" : {$in:[product_id]}},{
                    $inc: { "cart.$.count" : -1}
                },{new: true});

                // console.log(updated_cart);
                if(updated_cart){
                    res.json({
                        status: true,
                        data: updated_cart,
                        message : "Count Decreased"
                    })
                }
            }else{

                //This is causing a problem if one wants to delete the cart array item
                let removed_cart = await Cart.findOneAndUpdate({user:user_id, "cart.product": {$in: [product_id]}},{
                    cart: []
                },{new:true});
                console.log(removed_cart);
                if(removed_cart){
                    res.json({
                        status: true,
                        message: "Cart is empty"
                    })
                }
            }

        }else{
            res.json({
                status: false,
                message: "No cart is there for you."
            })    
        }
        
    }catch(err){
        console.log(err);
        res.json({
            status: false,
            message: "Server Error"
        })
    }

}