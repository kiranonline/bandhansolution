const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const saltRounds = 10;
const JWT_KEY = process.env.JWT_SECRET_KEY;
// for requesting
const fetch = require('node-fetch');
const mongoose = require("mongoose");
//kiran

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
        let existingUser;
        if(req.body.email){
            existingUser = await User.findOne({$or:[{email:req.body.email},{phoneNumber:req.body.phoneNumber}]})
        }else{
            existingUser = await User.findOne({phoneNumber:req.body.phoneNumber})
        }
        // console.log(existingUser);
        if(existingUser){
            res.json({
                status : false,
                message : 'The phone number or email id is already registered with another account.'
            })
        }else{
            let securepassword = await bcrypt.hash(req.body.password, saltRounds);
            let otp_number=Math.floor(100000 + Math.random() * 900000);

            


            if(req.body.phoneNumber){
                //this is the message sending part

                const message = encodeURIComponent(`Your OTP for registering to Krishi is ${otp_number}. Please don't share your OTP with anyone else!`)

                const URI = `https://api.textlocal.in/send/?apikey=ugNZijBNUDk-jSjhzXA26w3Zq2loX7Boja87bIp2P5&numbers=${req.body.phoneNumber}&message=${message}`

                fetch(URI)
                .then(res => res.json())
                .then(res => console.log("OTP MESSAGE RESPONSE------------",res))
                .catch(error => {
                    console.log(error);
                })


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
                    data:user._id,
                    otp: otp_number
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

exports.resnedOTP = async(req,res,next)=> {
    try {
        let new_otp=Math.floor(100000 + Math.random() * 900000);
        let user = await User.findByIdAndUpdate(req.body.user_id, {otp: new_otp}, {new: true});

        const message = encodeURIComponent(`Your OTP for registering to Krishi is ${new_otp}. Please don't share your OTP with anyone else!`)

        const URI = `https://api.textlocal.in/send/?apikey=ugNZijBNUDk-jSjhzXA26w3Zq2loX7Boja87bIp2P5&numbers=${user.phoneNumber}&message=${message}`

        let OTPResponse = await fetch(URI)
        OTPResponse = await OTPResponse.json()
        console.log("OTP MESSAGE RESPONSE------------",OTPResponse)
        
        res.json({
            status : true,
            message : 'OTP resend successful',
            data:user._id,
            otp: new_otp
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Somethinmg went wrong!"
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



//++++++++++++++++++++++++++++++++++++++ Forgot password +++++++++++++++++++++++++++++++++++++
exports.forgotpassword = async(req,res)=>{
    try{
        const {phoneNumber} = req.body;
        let otpnumber=Math.floor(100000 + Math.random() * 900000);
        console.log(otpnumber)
        console.log(phoneNumber);
        // verify the number and push the otp in this user's otp array
        // then send it to the frontend
        
        let updateduser = await User.findOneAndUpdate({phoneNumber: phoneNumber},{
            $push: {
                otp: otpnumber
            }
        },{new:true})
        if(!updateduser){
            res.json({
                status:false,
                message:"sorry, this phone number not exists"
            })
        }else{
            console.log(updateduser)
            res.json({
                status:true,
                message:"otp sent",
                otp: updateduser.otp[0],
                phoneNumber
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            message : 'server error'
        })
    }
    
}



//++++++++++++++++++++++++++++++++++++++ Resend otp for password change +++++++++++++++++++++++++++++++++++++
exports.resendotppasswordchange = async(req,res)=>{
    try{
        let { phoneNumber } = req.body;

        // check the otp in user's db having the above phoneNumber and send the otp
        let user = await User.findOne({phoneNumber});
        console.log(user);
        if(user){
            res.json({
                status:true,
                message: "otp resent",
                otp: user.otp[0]
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            message : 'server error'
        })
    }
}



//++++++++++++++++++++++++++++++++++++++ Change password +++++++++++++++++++++++++++++++++++++
exports.changepassword = async(req,res)=>{
    try{
        // validate otp came from frontend
        const { phoneNumber, otpnumber, newpassword } = req.body;

        let password = await bcrypt.hash(newpassword, 10);
        
        let user = await User.findOneAndUpdate({
            phoneNumber:phoneNumber,
            otp: {
                $in: otpnumber
            }
        },{
            password: password,
            $pull: {
                otp: otpnumber 
            }
        },{new:true});
        if(!user){
            res.json({
                status:false,
                message:"sorry, we didn't find your mobile number registered"
            });
        }else{
            res.json({
                status:true,
                message:"password successfully changed"
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


//++++++++++++++++++++++++++++++++++++++ Login User with phoneNumber & password +++++++++++++++++++++++++++++++++++++
exports.loginnormalUser= async(req,res,next)=>{
    try{
        let user = await User.find({phoneNumber:req.body.phoneNumber});
        // console.log(user.length);
        if(user.length>0){
            console.log(user[0]);
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













//++++++++++++++++++++++++++++++++ get profile details +++++++++++++++++++++++++++++++++++++++
exports.getProfileDetails = async(req,res,next)=>{
    try{
        var user;
        let _id = req.query._id;
        if(req.user.userType==='admin' || req.user._id==_id){
            user = await User.findOne({
                isActive:true,
                _id:_id
            })
            if(user){
                res.json({
                    status:true,
                    message:"profile data fetched",
                    data:user
                })
            }
            else{
                res.json({
                    status:false,
                    message:"invalid user id"
                })
            }
        }
        else{
            res.json({
                status:false,
                message:"you can not fetch details of othe users"
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




//++++++++++++++++++++++++++++++++ get profile details +++++++++++++++++++++++++++++++++++++++
exports.updateProfile = async(req,res,next)=>{
    try{
        let {name,email,phoneNumber,avatar,deliverTo,_id} = req.body;
        if(req.user.userType==='admin' || req.user._id==_id){
            let existingUser = await User.findOne({
                $or:[{email:req.body.email},{phoneNumber:req.body.phoneNumber}],
                _id : {
                    $ne : mongoose.Types.ObjectId(_id)
                }
            })
            if(existingUser){
                res.json({
                    status:false,
                    message:"duplicate email or phone"
                })
            }
            else{
                let updatedUser = await User.findByIdAndUpdate(_id,
                    {
                        name,email,phoneNumber,avatar,deliverTo
                    },
                    {
                        new:true
                    }
                )
                console.log(updatedUser);
                res.json({
                    status:true,
                    message:"user updated"
                })
            }
        }
        else{
            res.json({
                status:false,
                message:"you can not change others profile"
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