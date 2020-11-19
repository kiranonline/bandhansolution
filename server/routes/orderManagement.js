const express = require("express");
const {body} = require("express-validator");
const { 
    getMyOrders,
    getOrderDetails,
    updateOrderStatus
} = require("../controllers/orderManagement");
const {isAuthenticated,isAdmin, isSeller} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const router = express.Router();


//+++++++++++++++++++++++++++++++++++++++ create Product ++++++++++++++++++++++++++
router.post(`/seller/get-my-orders`,isAuthenticated,getMyOrders)


router.get('/order/details/:id',isAuthenticated,getOrderDetails);



router.post('/order/update-status-details',[
    body("orderId").notEmpty() ,
    body("subOrderId").notEmpty(),
    body("status").notEmpty()
 ],errorHandler,isAuthenticated,updateOrderStatus);




module.exports = router;