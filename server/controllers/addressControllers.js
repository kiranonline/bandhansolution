const Address = require("../models/Address");



exports.addaddress = async(req,res,next) => {
    try{
        console.log(req.body);
        let address={};
        if(req.body.isdefault){
            address= new Address({
                lineone: req.body.lineone,
                locality: req.body.locality,
                city: req.body.city,
                district: req.body.district,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode,
                isdefault: req.body.isdefault,
                user: req.user._id
            });
        }else{
            address= new Address({
                lineone: req.body.lineone,
                locality: req.body.locality,
                city: req.body.city,
                district: req.body.district,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode,
                user: req.user._id
            });
        }
        
        console.log(address);
        await address.save();
        res.json({
            status:true,
            message:"Address saved successfully"
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
        let address = await Address.findOneAndUpdate({_id:address_id,user:req.user._id},{
                lineone: req.body.lineone,
                locality: req.body.locality,
                city: req.body.city,
                district: req.body.district,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode,
                user: req.user._id
        })
        console.log(address);
        res.json({
            status:true,
            message:"Address Edited"
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
        let address1= await Address.findOneAndUpdate({user: req.user._id, isdefault:true},{isdefault:false},{
            new:true
        })
        console.log(address1);
        let address2 = await Address.findByIdAndUpdate({_id:address_id, user:req.user._id},{isdefault:true},{
            new:true
        });
        console.log(address2);
        if(address2){
            res.json({
                status:true,
                message:"Default Address Updated"
            })
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