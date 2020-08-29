const express = require("express");
const {body} = require("express-validator");
const {errorHandler}  = require("../services/error");
const {productlist }  =require("../controllers/productlistControllers");
const router = express.Router();

//++++++++++++++++++++++++++++++++ Product List for product page ++++++++++++++++++++++++++++++++++
router.get("/user/productlist/",productlist)

module.exports = router;