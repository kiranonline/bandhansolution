const express = require("express");
const {body} = require("express-validator");
const { createCategory, listCategory, listCategoryForUsers } = require("../controllers/categoryControllers");
const {isAuthenticated,isAdmin} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const router = express.Router();


//+++++++++++++++++++++++++++++++++++++++ create category ++++++++++++++++++++++++++
router.post(`/category/create`,isAuthenticated,isAdmin,[
    body("name").not().isEmpty(),
],errorHandler,createCategory)



//++++++++++++++++++++++++++++++++ List Categories ++++++++++++++++++++++++++++++++++
router.post('/category/list',isAuthenticated,isAdmin,listCategory)


//++++++++++++++++++++++++++++++++ List Categories for users ++++++++++++++++++++++++++++++++++
router.get('/user/category/list',listCategoryForUsers)



module.exports = router;