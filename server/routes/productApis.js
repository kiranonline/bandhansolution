const express = require("express");
const {body} = require("express-validator");
const { listProductsForAdmin, createProduct, productDetailsForAdmin} = require("../controllers/productControllers");
const {isAuthenticated,isAdmin} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const router = express.Router();


//+++++++++++++++++++++++++++++++++++++++ create Product ++++++++++++++++++++++++++
router.post(`/product/create`,isAuthenticated,isAdmin,[
    body("name").not().isEmpty(),
    body("regularPrice").isNumeric()
],errorHandler,createProduct)



//++++++++++++++++++++++++++++++++ List Products for admin++++++++++++++++++++++++++++++++++
router.post('/product/listforadmin',isAuthenticated,isAdmin,listProductsForAdmin)



router.get('/product/detailsofadmin/:id',isAuthenticated,isAdmin,productDetailsForAdmin)


module.exports = router;