const Stock = require("../models/Stock");
const Cart = require("../models/Cart");
const Order = require("../models/Order")
const mongoose = require("mongoose");
const { update } = require("../models/Stock");



//ayushman
exports.availableForCart = async(req, res, next) => {
    try{
        const product_id = req.body.product_id;
        const qty = req.body.qty || 1;
        const pincode = req.body.pincode ? req.body.pincode : req.user.defaultAddress.pincode;
        // console.log(user_id);

        console.log("--------", pincode);

        let match_1={};
        let lookup={};
        let match_2={};

        match_1.product = mongoose.Types.ObjectId(product_id);
        match_1.stock = {$gte:qty};

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
        console.log(match_1,seller)
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



exports.placeOrderActual = async(req,res) => {
    try{
        let user_id = req.user._id;
        const pincode = req.user.defaultAddress.pincode;
        let myCart = await Cart.findOne({
            user : user_id
        }).populate("cart.product")
        console.log(myCart)
        if(myCart && myCart.cart.length>0){
            let arr = myCart.cart.map((ele)=>{
                const product_id = ele.product._id;
                const qty = ele.count;
                let match_1={};
                let lookup={};
                match_1.product = mongoose.Types.ObjectId(product_id);
                match_1.stock = {$gte:qty};
                lookup.from = "users";
                lookup.localField = "seller";
                lookup.foreignField = "_id";
                lookup.as = "seller_details";
                const query = [
                    {$match:match_1},
                    {$lookup:lookup},
                    {$unwind:"$seller_details"},
                    {$match:{
                        "seller_details.deliverTo":{$in:[pincode]}
                    }}            
                ]
                return Stock.aggregate(query);
            })
            let isInStock = await Promise.all(arr);
            let isPossible=true;
            let stockToDeduct=[];
            let deductQuequ=[]
            
            isInStock.forEach((ele,i)=>{
                console.log(ele)
                if(ele && Array.isArray(ele) && ele.length>0){
                    stockToDeduct.push(ele[0]);
                }
                else{
                    isPossible = (isPossible && false)
                }
            })
            if(isPossible){
                let newOrder = {
                    user : req.user._id,
                    currentStatus:"placed",
                    address : req.user.defaultAddress
                }
                let totalCoast=0;
                let items=[];
                console.log("stocks to deduct",stockToDeduct)
                stockToDeduct.forEach((ele,i)=>{
                    deductQuequ.push(Stock.findByIdAndUpdate(ele._id,{
                        $inc : { stock : (-1*myCart.cart[i].count) } 
                    }))
                    let iii={
                        product : ele.product,
                        count : myCart.cart[i].count,
                        seller : ele.seller,
                        stock : ele._id,
                        status : [{
                            name : "placed",
                            date : new Date(),
                            remark : "Order placed sucessfully."
                        }]
                    }
                    if(myCart.cart[i].product.salePrice && !isNaN(myCart.cart[i].product.salePrice)){
                        iii.totalPrice = myCart.cart[i].count*myCart.cart[i].product.salePrice;
                        iii.unitPrice = myCart.cart[i].product.salePrice
                        totalCoast += (myCart.cart[i].count*myCart.cart[i].product.salePrice)
                    }
                    else{
                        iii.totalPrice = myCart.cart[i].count*myCart.cart[i].product.regularPrice;
                        iii.unitPrice = myCart.cart[i].product.regularPrice
                        totalCoast += (myCart.cart[i].count*myCart.cart[i].product.regularPrice)
                    }
                    
                    items.push(iii)
                })
                newOrder.items = items;
                let ord = new Order(newOrder)
                myCart.cart=[]
                let queryQueue = [ord.save(),...deductQuequ,myCart.save()]
                await Promise.all(queryQueue)
                res.json({
                    status:true,
                    message:"order created",
                    data:newOrder
                })
            }
            else{
                res.json({
                    status:false,
                    message:"unable to place order"
                })
            }
        }
        else{
            res.json({
                status:false,
                message:"unable to place order, empty cart"
            })
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