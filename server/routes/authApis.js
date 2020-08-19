const express = require("express");
const {body} = require("express-validator");
const { LoginWithEmail, getUserDetails } = require("../controllers/authControllers");
const {isAuthenticated} = require("../services/authUtils");
const router = express.Router();


//+++++++++++++++++++++++++++++++++++++++ Login with email id and password ++++++++++++++++++++++++++
router.post(`/login-with-email-password`,[
    body("email").isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.')
],LoginWithEmail)



//++++++++++++++++++++++++++++++++++++++ Get user details ++++++++++++++++++++++++++++++
router.get("/userdetails",isAuthenticated,getUserDetails); 




module.exports = router;