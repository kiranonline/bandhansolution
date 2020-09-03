const express = require("express");
const {body} = require("express-validator");
const {isAuthenticated} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const { addtocart, fetchcart, removecartitem } = require("../controllers/cartController");
const router = express.Router();

//+++++++++++++++++++++++++++++++++++++++ Add to Cart  ++++++++++++++++++++++++++
router.post("/user/add-to-cart",[
    body("product_id").not().isEmpty()
],errorHandler,isAuthenticated,addtocart)

//+++++++++++++++++++++++++++++++++++++++ Fetches Cart  ++++++++++++++++++++++++++
router.get("/user/fetch-the-cart",isAuthenticated,fetchcart);

//+++++++++++++++++++++++++++++++++++++++ Removes Cart Item  ++++++++++++++++++++++++++
router.post("/user/remove-from-cart",[
    body("product_id").not().isEmpty()
],errorHandler,isAuthenticated,removecartitem);


module.exports = router;