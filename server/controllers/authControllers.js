const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const saltRounds = 10;
const JWT_KEY = process.env.JWT_SECRET_KEY;



//++++++++++++++++++++++++++++++++++++++ Login with email id and password +++++++++++++++++++++++++++++++++++++
exports.LoginWithEmailAndPassword = async(req,res,next)=>{
    try{
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
    catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            message : 'server error'
        })
    }
}

//++++++++++++++++++++++++++++++++++++++ Create Normal User with email-id or phoneNumber & password +++++++++++++++++++++++++++++++++++++
exports.createnormalUser= async(req,res,next) =>{
    try{
        let existingUser = await User.findOne({$or:[{email:req.body.email},{phoneNumber:req.body.phoneNumber}]})
        // console.log(existingUser);
        if(existingUser){
            res.json({
                status : false,
                message : 'The phone number is already registered with another account.'
            })
        }else{
            let securepassword = await bcrypt.hash(req.body.password, saltRounds);
            let otp_number=Math.floor(100000 + Math.random() * 900000);
            if(req.body.phoneNumber){
                //create user with phone number.
                let user = new User({
                    name : req.body.name,
                    password : securepassword,
                    email : req.body.email,
                    phoneNumber : req.body.phoneNumber,
                    userType : 'customer',
                    isActive : true,
                    isVerified:false,
                    otp:otp_number
                })

                console.log(user);
                await user.save();                
                res.json({
                    status : true,
                    message : 'User registered sucessfully.',
                    data:user._id
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

exports.otpverification= async(req,res,next)=>{
    try{
        const user_otp=req.body.otp;
        // console.log(req.body.user_id)
        const _id=req.body.user_id;
        let user = await User.find({_id:_id});
        // console.log(user[0].otp.includes(user_otp));
        if(user && user[0].otp.includes(user_otp)){
            let updated_user=user;
            updated_user[0].otp=[];
            updated_user[0].isVerified=true;
            await updated_user[0].save();
            const token = jwt.sign(
                {
                  //generates token
                  userId: user[0]._id
                },
                JWT_KEY,
                {
                  expiresIn: "24h"
                }
              );
              return res.json({
                status: true,
                message: "Successfully Logged in",
                token: token,
                data:updated_user
              });
        }else{
            res.json({
                status:false,
                message:"invalid otp"
            })
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


//++++++++++++++++++++++++++++++++++++++ Create Normal User with email-id or phoneNumber & password +++++++++++++++++++++++++++++++++++++
exports.loginnormalUser= async(req,res,next)=>{
    try{
        let user = await User.find({phoneNumber:req.body.phoneNumber});
        console.log(user);
        if(user[0]){
            let isPasswordValid = await user[0].comparePassword(req.body.password);
            if(isPasswordValid){
                let token = jwt.sign({_id : user[0]._id.toString()},process.env.JWT_SECRET_KEY);
                let data = user[0].toObject();
                delete data["password"];
                res.json({
                    status : true,
                    message : 'login successfull',
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
                message : 'phone number does not exist'
            })
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