const Stock = require("../models/Stock");
const Cart = require("../models/Cart");
const Order = require("../models/Order")
const mongoose = require("mongoose");
const { update } = require("../models/Stock");



exports.getMyOrders = async(req,res) => {
    try{
        let query = [];
        let q = [];
        let pageNumber = req.body.pageNumber || 1;
        let pageSize = req.body.pageSize || 50;
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        let sellerId = req.body.sellerId;
        console.log(req.user.userType)
        if(req.user.userType==='admin'){
            console.log("in admin",sellerId)
            q = [{
                $match:{
                    "items.seller" : mongoose.Types.ObjectId(sellerId)
                }
            }]
        }
        else{
            q = [{
                $match:{
                    "items.seller" : mongoose.Types.ObjectId(req.user._id)
                }
            }]
        }
        console.log(q)
        query=[...q,
            {
                $sort:{
                    "createdAt":-1
                }
            },
            {
                $skip:(pageNumber-1)*pageSize
            },
            {
                $limit : pageSize
            },
            {
                $lookup:{
                    from : "users",
                    localField:"user",
                    foreignField:"_id",
                    as:"user_details"
                }
            },
            {
                $unwind:{
                    path:"$user_details",
                    preserveNullAndEmptyArrays:true
                }
            }
        ];
        let [orders,total] = await Promise.all([
            Order.aggregate(query),
            Order.aggregate(q)
        ]) ;
        if(orders){
            res.json({
                status: true,
                message:"orders fetched",
                data: orders,
                total:total.length
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






exports.getOrderDetails = async(req,res) => {
    console.log("order details")
    try{
        let orderId = req.params.id;
        let order = await Order.findById(orderId).populate("user").populate("items.seller").populate("items.product")
        res.json({
            status:true,
            message:"order details fetched",
            data:order,
            userId:req.user._id
        })
    }
    catch(err){
        console.log(err);
        res.status(500).status({
            status: false,
            message: "Couldn't update"
        })
    }
}
exports.updateOrderStatus = async(req,res) => {
    try{
        let orderId = req.body.orderId;
        let subOrderId = req.body.subOrderId;
        let status = req.body.status;
        let description = req.body.description;
        let order = await Order.findById(orderId);
        if(order){
            order.items.forEach((ele,i)=>{
                console.log(ele._id.toString(),"===",subOrderId,"      ",ele.seller,"=>",req.user._id)
                // if(ele._id.toString()==subOrderId && ele.seller.toString()==req.user._id){
                //     order.items[i].status.push({
                //         name : status,
                //         date:new Date(),
                //         remark:description
                //     })
                // }
                if(ele._id.toString()==subOrderId){
                    if(req.user.userType==='admin'){
                        order.items[i].status.push({
                            name : status,
                            date:new Date(),
                            remark:description
                        })
                    }
                    else if(ele.seller.toString()==req.user._id){
                        order.items[i].status.push({
                            name : status,
                            date:new Date(),
                            remark:description
                        })
                    }
                    
                }
                console.log(order.items[i].status)
            })
            await order.save();
            res.json({
                status:true,
                message:"updated"
            })
        }
        else{
            res.json({
                status:false,
                message:"invalid order id"
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