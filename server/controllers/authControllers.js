const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } =require("express-validator");
const {formatRequestError} = require("../services/error");



//++++++++++++++++++++++++++++++++++++++ Login with email id and password +++++++++++++++++++++++++++++++++++++
exports.LoginWithEmail = async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({
                status : false,
                message : 'invalid inputs',
                errors : formatRequestError(errors)
            })
        }
        else{
            let user = await User.findOne({email : req.body.email});
            if(user){
                let isPasswordValid = await user.comparePassword(req.body.password);
                if(isPasswordValid){
                    let token = jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET_KEY);
                    let data = user.toObject();
                    delete data["password"];
                    res.json({
                        status : true,
                        message : 'login sucessfully',
                        token,
                        data
                    })
                }
                else{
                    res.json({
                        status : false,
                        message : 'invalid password.'
                    })
                }
            }
            else{
                res.json({
                    status : false,
                    message : 'email does not exist'
                })
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            message : 'server error'
        })
    }
}




//++++++++++++++++++++++++++++++++ get user details +++++++++++++++++++++++++++++++++++++++
exports.getUserDetails = (req,res,next)=>{
    res.json({
        status : true,
        message : "user details fetched",
        data : req.user
    })    
}