const express = require("express");
const {body} = require("express-validator");
const  multer = require("multer");
const {multerStorage} = require("../services/fileStorage");
const {UploadFile} = require("../controllers/fileuploadControllers");
const {isAuthenticated,isAdmin} = require("../services/authUtils");
const router = express.Router();

let upload1 = multer({storage:multerStorage("/images/users")});
let upload2 = multer({storage:multerStorage("/images/products")});


//++++++++++++++++++++user avatar upload Api++++++++++++++++++++++++
router.post("/upload-avatar",isAuthenticated,upload1.single('avatar'),UploadFile);


//++++++++++++++++++++product image upload Api++++++++++++++++++++++++
router.post("/upload-product-image",isAuthenticated,isAdmin,upload2.single('image'),UploadFile);


module.exports = router;
