const express = require("express");
const {body} = require("express-validator");
const {errorHandler}  = require("../services/error");
const {productlist,singleProduct }  =require("../controllers/productlistControllers");
const router = express.Router();

//++++++++++++++++++++++++++++++++ Product List for product page ++++++++++++++++++++++++++++++++++
router.get("/user/productlist/",productlist)

//++++++++++++++++++++++++++++++++ Single Product  ++++++++++++++++++++++++++++++++++
router.get("/product/:id", singleProduct)

module.exports = router;