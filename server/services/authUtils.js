const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.isAuthenticated = async (req,res,next) => {
    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            //console.log(token)
            let decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            //console.log(decoded);
            let user = await User.findById(decoded._id).select("-password");
            //console.log(user);
            user = user.toObject();
            if(user){
                req.user = user;
                next();
            }
            else{
                res.status(401).json({
                    status : false,
                    message : "Auth failed."
                })
            }
        }
        else{
            res.status(401).json({
                status : false,
                message : "Auth failed."
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            message : "server error"
        })
    }
};
