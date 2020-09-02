const express = require("express");
const {body} = require("express-validator");
const {isAuthenticated} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const { addtocart } = require("../controllers/cartController");
const router = express.Router();

//+++++++++++++++++++++++++++++++++++++++ Add to Cart  ++++++++++++++++++++++++++
router.post("/user/add-to-cart",[
    body("product_id").not().isEmpty()
],errorHandler,isAuthenticated,addtocart)

module.exports = router;