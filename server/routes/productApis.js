const express = require("express");
const {body} = require("express-validator");
const { 
    listProductsForAdmin, 
    createProduct, 
    productDetailsForAdmin, 
    listProductsForSeller,
    productDetailsForSeller,
    updateProductStockBySeller
} = require("../controllers/productControllers");
const {isAuthenticated,isAdmin, isSeller} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const router = express.Router();


//+++++++++++++++++++++++++++++++++++++++ create Product ++++++++++++++++++++++++++
router.post(`/product/create`,isAuthenticated,isAdmin,[
    body("name").not().isEmpty(),
    body("regularPrice").isNumeric()
],errorHandler,createProduct)

//++++++++++++++++++++++++++++++++ List Products for admin++++++++++++++++++++++++++++++++++
router.post('/product/listforadmin',isAuthenticated,isAdmin,listProductsForAdmin);

//++++++++++++++++++++++++++++++++ Product details for admin
router.get('/product/detailsofadmin/:id',isAuthenticated,isAdmin,productDetailsForAdmin);





//++++++++++++++++++++++++++++++++ List of Products for seller++++++++++++++++++++++++
router.post('/product/listforseller',isAuthenticated,isSeller,listProductsForSeller);

//++++++++++++++++++++++++++++++++ Product details for admin
router.get('/product/detailsforseller/:id',isAuthenticated,isSeller,productDetailsForSeller);

//++++++++++++++++++++++++++++++++Update product stock +++++++++++++++++++++++++++++
router.post(`/product/stock/updatebyseller`,isAuthenticated,isSeller,[
    body("id").not().isEmpty(),
    body("stock").isNumeric(),
],errorHandler,updateProductStockBySeller)








module.exports = router;