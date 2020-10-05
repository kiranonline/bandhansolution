const express = require("express");
const {body, oneOf} = require("express-validator");
const { LoginWithEmailAndPassword, getUserDetails, resnedOTP } = require("../controllers/authControllers");
const { createnormalUser, otpverification,loginnormalUser } = require("../controllers/authControllers");
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

//++++++++++++++++++++++++++++++++++++++ Login Customer with email or phone number & password ++++++++++++++++++++++++++++++
router.post("/user/login-with-email-or-phone-password",[
    body("phoneNumber").isNumeric().isLength({min:10,max:10}).withMessage('Not a valid phone number'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 chars long.')
],errorHandler,loginnormalUser)

//++++++++++++++++++++++++++++++++++++++ Get user details ++++++++++++++++++++++++++++++
router.get("/userdetails",isAuthenticated,getUserDetails); 



module.exports = router;