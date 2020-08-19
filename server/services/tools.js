const bcrypt = require('bcrypt');
const User = require("../models/User");
const saltRounds = 10;

exports.createAdminUser = async(name,email,password)=>{
    try{
        console.log('creating user...');
        let securepassword = await bcrypt.hash(password, saltRounds);
        let user = new User({
            name,
            email,
            password : securepassword,
            userType : 'admin'
        })
        let u = await user.save();
        console.log(u)
    }
    catch(err){
        console.log(err);
    }
    
}