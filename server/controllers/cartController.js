const Stock = require("../models/Stock");
const Cart = require("../models/Cart");
const Order = require("../models/Order")
const mongoose = require("mongoose");
const { update } = require("../models/Stock");



//ayushman
exports.availableForCart = async(req, res, next) => {
    try{
        const product_id = req.body.product_id;
        const pincode = req.body.pincode ? req.body.pincode : req.user.defaultAddress.pincode;
        // console.log(user_id);

        console.log("--------", pincode);

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
            res.json({
                status: true,
                availableToAdd: true
            })
            
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


//to be used only for hard resetting the cart, for increment or decrement use the updated add to cart
exports.updatecart = async(req,res,next) => {

    //Problem in fetching in cart array.
    try{
        const {cart, _id} = req.body;
        

        console.log(`id = ${_id}`)
        console.log(cart)

        if(!cart || !_id){
            res.json({
                status:false,
                message: "Cart items not found"
            })
        }
        const newCart = await Cart.findByIdAndUpdate(_id, {cart}, {new: true});
        
        if(newCart){
            // console.log(cart_details[0].product_details);
            res.json({
                status:true,
                data: newCart
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:false,
            message: "Server Error"
        })
    }
}

exports.placeOrder = async(req,res) => {
    try{
        let user = req.user;
        let {cart, totalCost, cart_id, address = null } = req.body

        let currentOrder = new Order({
            items: cart,
            user: user._id,
            totalCost,
            currentStatus: "placed",
            address
        })

        let savedOrder = await currentOrder.save();
        if(savedOrder){
            res.json({
                status: true,
                order: savedOrder
            })
            await Cart.findByIdAndUpdate(cart_id, {cart: []}, {new: true})

        }
        else{
            throw "Not created!!"
        }
    }
    catch(err){
        console.log(err);
        res.status(500).status({
            status: false,
            message: "Not Created!"
        })
    }
}

exports.getOrder = async(req,res) => {
    try{
        let query = [
            {$match: {user: req.user._id}},            
            {$lookup: {
                from :"products",
                localField: "items.product",
                foreignField: "_id",
                as: "product_details"
            }},
            {
                $sort: {
                    'createdAt': -1
                }
            }
        ]
        let orders = await Order.aggregate(query);
        
        if(orders){
            res.json({
                status: true,
                data: orders
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).status({
            status: false,
            message: "Couldn't update"
        })
    }
}


exports.cancelOrder = async(req,res,next) => {
    try{
        let { orderId } = req.body;
        console.log(orderId);
        let cancelledOrder = await Order.findOneAndUpdate(orderId, {currentStatus: "cancelled"}, {new: true})
        console.log(cancelledOrder);
        res.json({
            status: true,
            data: cancelledOrder
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status: false,
            message: err
        })
    }
}

//temporary
exports.deleteOrder = async(req,res,next) => {
    try{
        let { orderId } = req.body;
        let deletedOrder = await Order.findByIdAndDelete(orderId)
        console.log(deletedOrder);
        res.json({
            status: true,
            data: deletedOrder
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status: false,
            message: err
        })
    }
}


//shubham


exports.addtocart = async(req,res,next) =>{
    try{
        const product_id = req.body.product_id;
        const user_id = req.user._id;
        const pincode = req.body.pincode ? req.body.pincode : req.user.defaultAddress.pincode;
        const countAdd = req.body.countAdd ? req.body.countAdd : 1; 
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
                    $inc: {"cart.$.count":countAdd}
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
                data: cart_details[0]
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