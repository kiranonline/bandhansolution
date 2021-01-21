const express = require("express");
const  multer = require("multer");
const { UploadPoster, Listposter, DeletePoster} =require("../controllers/posterController")
const {multerStorage} = require("../services/fileStorage");
const {isAuthenticated,isAdmin} = require("../services/authUtils");
const router = express.Router();

let upload1 = multer({storage:multerStorage("/images/posters")});


//++++++++++++++++++++poster upload Api++++++++++++++++++++++++
router.post("/upload-poster",isAuthenticated,isAdmin,upload1.single('poster'),UploadPoster);

//++++++++++++++++++++poster delete Api++++++++++++++++++++++++
router.post("/delete-poster",isAuthenticated,isAdmin,DeletePoster);


//++++++++++++++++++++list poster Api++++++++++++++++++++++++
router.get("/list-poster",Listposter);




module.exports = router;
