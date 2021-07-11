const Address = require("../models/Address");
const User = require("../models/User");
const { use } = require("../routes/addressApi");


//shubham
//get addresses
exports.getAddress = async(req,res,next) => {
    try{
        let address = await Address.find({user: req.user._id,isActive:true})
        res.json({
            status:true,
            message:"Address fetched successfully",
            data : address
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status:false,
            message:"Server Error"
        })
    }
}







exports.addaddress = async(req,res,next) => {
    try{
        console.log(req.body);
        let user = await User.findById(req.user._id);
        let address= new Address({
            lineone: req.body.lineone,
            locality: req.body.locality,
            city: req.body.city,
            district: req.body.district,
            state: req.body.state,
            country: req.body.country,
            pincode: req.body.pincode,
            user: req.user._id
        });
        address = await address.save();
        if(!user.defaultAddress){
            user.defaultAddress = address
            address.isdefault = true;
            await address.save(); 
            await user.save();
        }
        console.log(user,address);
        
        res.json({
            status:true,
            message:"Address saved successfully",
            data: address
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status:false,
            message:"Server Error"
        })
    }
}

exports.removeaddress = async(req,res,next) => {
    try{
        const address_id = req.body.address_id;
        const address = await Address.findOneAndUpdate({_id: address_id,user:req.user._id},{isActive:false},{
            new:true
        });
        console.log(address);
        res.json({
            status:true,
            message:"Address Removed"
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status:false,
            message:"Server Error"
        })
    }
}

exports.editaddress = async(req,res,next) => {
    //code
    
    try{
        const address_id=req.body.address_id;
        let address = await Address.findOneAndUpdate({_id:address_id,user:req.user._id,isActive:true},{
                lineone: req.body.lineone,
                locality: req.body.locality,
                city: req.body.city,
                district: req.body.district,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode,
                user: req.user._id
        }, {new: true})
        console.log(address);
        if(address.isdefault){
            let user = await User.findByIdAndUpdate(req.user._id,{
                defaultAddress : address
            });
        }
        res.json({
            status:true,
            message:"Address Edited",
            data: address
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status:false,
            message:"Server Error"
        })
    }
}

exports.setdefaultaddress = async(req,res,next) => {
    try{
        const address_id = req.body.address_id;
        let address = await Address.findOneAndUpdate({_id:address_id, user:req.user._id,isActive:true},{isdefault:true},{
            new:true
        });
        if(address){
            console.log("here")
            let old_address= await Address.findByIdAndUpdate(req.user.defaultAddress._id,{isdefault:false},{
                new:true
            })
            console.log(old_address);
            let updated_user = await User.findOneAndUpdate({_id:req.user._id},{defaultAddress:address
            },{new:true});
            console.log(updated_user);
            if(address){
                res.json({
                    status:true,
                    message:"Default Address Updated"
                })
            }
        }
        
    }
    catch(err){
        console.log(err);
        res.json({
            status:false,
            message:"Server Error"
        })
    }
}