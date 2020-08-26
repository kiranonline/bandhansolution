const express = require("express");
const {body, oneOf} = require("express-validator");
const { createUser, listUsers,productlist} = require("../controllers/userControllers");
const {isAuthenticated,isAdmin} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const router = express.Router();


//+++++++++++++++++++++++++++++++++++++++ create user ++++++++++++++++++++++++++
router.post(`/user/create`,isAuthenticated,isAdmin,[
    body("email").isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.'),
    body("name").not().isEmpty(),
    body("userType").not().isEmpty(),                                                                                                                                                                                                                                                                                                                                                                                                                           
    body("phoneNumber").isLength({min:10,max:10})
],errorHandler,createUser)



//++++++++++++++++++++++++++++++++ List Users ++++++++++++++++++++++++++++++++++
router.post('/user/list',isAuthenticated,isAdmin,listUsers)





module.exports = router;