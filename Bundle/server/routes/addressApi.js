const express = require("express");
const {body} = require("express-validator");
const { addaddress,removeaddress,editaddress,setdefaultaddress,getAddress } = require("../controllers/addressControllers");
const {isAuthenticated,isAdmin} = require("../services/authUtils");
const {errorHandler}  = require("../services/error");
const router = express.Router();


//++++++++++++++++++++++++++++++++++ get Address ++++++++++++++++++++++++
router.get("/user/get/address",isAuthenticated,getAddress)









//+++++++++++++++++++++++++++++++++++++++ Add Address ++++++++++++++++++++++++++
router.post("/user/add/address",[
    body("lineone").not().isEmpty(),
    body("locality").not().isEmpty(),
    body("city").not().isEmpty(),
    body("district").not().isEmpty(),
    body("state").not().isEmpty(),
    body("country").not().isEmpty(),
    body("pincode").not().isEmpty()
],errorHandler,isAuthenticated,addaddress);

//+++++++++++++++++++++++++++++++++++++++ Remove Address ++++++++++++++++++++++++++
router.post("/user/remove/address",isAuthenticated,removeaddress);


//+++++++++++++++++++++++++++++++++++++++ Edit Address ++++++++++++++++++++++++++
router.post("/user/edit/address",[
  body("lineone").not().isEmpty(),
  body("locality").not().isEmpty(),
  body("city").not().isEmpty(),
  body("district").not().isEmpty(),
  body("state").not().isEmpty(),
  body("country").not().isEmpty(),
  body("pincode").not().isEmpty()
],errorHandler,isAuthenticated,editaddress);


//+++++++++++++++++++++++++++++++++++++++ Set Default Address ++++++++++++++++++++++++++
router.post("/user/setdefault/address",[
  body("address_id").not().isEmpty()  
],errorHandler,isAuthenticated,setdefaultaddress);


module.exports = router;