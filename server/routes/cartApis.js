const express = require("express");
const {body} = require("express-validator");
const {isAuthenticated} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const { placeOrderActual, addtocart, updatecart, fetchcart, removecartitem, availableForCart, placeOrder, getOrder, cancelOrder, deleteOrder } = require("../controllers/cartController");
const router = express.Router();


//+++++++++++++++++++++++ Check if available to be added to cart  ++++++++++++++++++++++++++
router.post("/user/available-for-cart",[
    body("product_id").not().isEmpty()
],errorHandler,isAuthenticated,availableForCart)

//+++++++++++++++++++++++++++++++++++++++ Add to Cart  ++++++++++++++++++++++++++
router.post("/user/add-to-cart",[
    body("product_id").not().isEmpty()
],errorHandler,isAuthenticated,addtocart)

//+++++++++++++++++++++++++++++++++++++++ Add to Cart  ++++++++++++++++++++++++++
router.post("/user/update-cart",isAuthenticated,updatecart)

//+++++++++++++++++++++++++++++++++++++++ Fetches Cart  ++++++++++++++++++++++++++
router.get("/user/fetch-the-cart",isAuthenticated,fetchcart);

//+++++++++++++++++++++++++++++++++++++++ Removes Cart Item  ++++++++++++++++++++++++++
router.post("/user/remove-from-cart",[
    body("product_id").not().isEmpty()
],errorHandler,isAuthenticated,removecartitem);

//+++++++++++++++++++++++++++++++++++++++ Place order  ++++++++++++++++++++++++++
router.post("/user/place-order",isAuthenticated, placeOrder)

//+++++++++++++++++++++++++++++++++++++++ Place order  ++++++++++++++++++++++++++
router.get("/user/get-orders",isAuthenticated, getOrder)


//+++++++++++++++++++++++++++++++++++++++ Cancel order  ++++++++++++++++++++++++++
router.post("/user/cancel-order",isAuthenticated,[
    body("orderId").not().isEmpty()
],errorHandler, cancelOrder)

//+++++++++++++++++++++++++++++++++++++++ delete order temp  ++++++++++++++++++++++++++
router.post("/user/delete-order",[
    body("orderId").not().isEmpty()
],errorHandler, deleteOrder)


router.post("/user/place-order-actual",isAuthenticated, placeOrderActual)

module.exports = router;