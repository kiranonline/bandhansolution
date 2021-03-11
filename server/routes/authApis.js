const express = require("express");
const {body, oneOf, query} = require("express-validator");
const bcrypt=require("bcrypt");
const { LoginWithEmailAndPassword, getUserDetails, resnedOTP, getProfileDetails, updateProfile, forgotpassword, changepassword, resendotppasswordchange } = require("../controllers/authControllers");
const { createnormalUser, otpverification,loginnormalUser } = require("../controllers/authControllers");
const User = require("../models/User");
const {isAuthenticated} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const router = express.Router();


//+++++++++++++++++++++++++++++++++++++++ Login with email id and password ++++++++++++++++++++++++++
router.post(`/login-with-email-password`,[
    body("email").isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.')
],errorHandler,LoginWithEmailAndPassword)

//++++++++++++++++++++++++++++++++ Create User for Customer ++++++++++++++++++++++++++++++++++
router.post('/user/createnormal',[
    oneOf([
        body("phoneNumber").isNumeric().isLength({min:10,max:10}).withMessage('Not a valid phone number'),
        body("email").isEmail()
    ]),
    body("name").not().isEmpty(),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 chars long.')
],errorHandler,createnormalUser);

router.post("/user/otpverification",[
    body("user_id").not().isEmpty(),
    body("otp").not().isEmpty()
],errorHandler,otpverification);

//+++++++++++++++++++++++++++ Resend OTP to the user ++++++++++++++++++++++++++++++
router.post("/user/resend_otp",[
    body("user_id").not().isEmpty()
],errorHandler,resnedOTP);


//++++++++++++++++++++++++++++++++ Forgot password, (send the otp) ++++++++++++++++++++++++++++++++++
router.post("/user/forgotpassword",[
    body("phoneNumber").not().isEmpty()
],errorHandler, forgotpassword)



//++++++++++++++++++++++++++++++++ Resend otp for forgot password ++++++++++++++++++++++++++++++++++
router.post("/user/resendotppasswordchange", [
    body("phoneNumber").not().isEmpty()
],errorHandler, resendotppasswordchange)


//++++++++++++++++++++++++++++++++ Change password ++++++++++++++++++++++++++++++++++
router.post("/user/changepassword",[
    body("otpnumber").not().isEmpty(),
    body("newpassword").not().isEmpty(),
    body("phoneNumber").not().isEmpty()
],errorHandler, changepassword)



//++++++++++++++++++++++++++++++++++++++ Login Customer with email or phone number & password ++++++++++++++++++++++++++++++
router.post("/user/login-with-email-or-phone-password",[
    body("phoneNumber").isNumeric().isLength({min:10,max:10}).withMessage('Not a valid phone number'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 chars long.')
],errorHandler,loginnormalUser)

//++++++++++++++++++++++++++++++++++++++ Get user details ++++++++++++++++++++++++++++++
router.get("/userdetails",isAuthenticated,getUserDetails); 






//++++++++++++++++++++++++++++++++++++++ Get profile details ++++++++++++++++++++++++++++++
router.get("/profiledetails",[
    query("_id").notEmpty()
],errorHandler,isAuthenticated,getProfileDetails); 




router.post('/update-profile',[
    oneOf([
        body("phoneNumber").isNumeric().isLength({min:10,max:10}).withMessage('Not a valid phone number'),
        body("email").isEmail()
    ]),
    body("name").not().isEmpty()
],errorHandler,isAuthenticated,updateProfile);


module.exports = router;