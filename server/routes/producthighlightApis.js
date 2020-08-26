const express = require("express");
const {body} = require("express-validator");
const { producthighlight} = require("../controllers/producthighlightControllers");
const {errorHandler}  = require("../services/error");
const router = express.Router();


//++++++++++++++++++++++++++++++++ Product List ++++++++++++++++++++++++++++++++++
router.get("/user/producthighlight",producthighlight);

module.exports = router;