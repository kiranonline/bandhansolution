const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;


//++++++++++++++++++++++++++++++++++++++ create user +++++++++++++++++++++++++++++++++++++
exports.createUser = async(req,res,next)=>{
    try{
        let existingUser = await User.findOne({$or:[{email:req.body.email},{phoneNumber:req.body.phoneNumber}]})
        if(existingUser){
            res.json({
                status : false,
                message : 'The email or phone number is already registered with another account.'
            })
        }
        else{
            let securepassword = await bcrypt.hash(req.body.password, saltRounds);
            let user = new User({
                name : req.body.name,
                password : securepassword,
                email : req.body.email,
                userType : req.body.userType,
                phoneNumber : req.body.phoneNumber,
                avatar : req.body.avatar,
                isActive : true
            })
            console.log(user);
            await user.save();
            res.json({
                status : true,
                message : 'User registered sucessfully.'
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



//++++++++++++++++++++++++++++++++++++++ list users +++++++++++++++++++++++++++++++++++++
exports.listUsers = async(req,res,next)=>{
    try{ 
        let query = {isActive:true};
        let pageNumber = req.body.pageNumber || 1;
        let pageSize = req.body.pageSize || 50;
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        if(req.body.userType && (req.body.userType==='admin' || req.body.userType==='seller' || req.body.userType==='customer')){
            query.userType = req.body.userType;
        }
        console.log(pageNumber,pageSize)
        let [users,totalUserSize] = await Promise.all([User.find(query).skip((pageNumber-1)*pageSize).limit(pageSize),User.countDocuments(query)]);
        res.json({
            status : true,
            message : "Users fetched sucessfully.",
            data : users,
            total : totalUserSize
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            message : 'server error'
        })
    }
}


