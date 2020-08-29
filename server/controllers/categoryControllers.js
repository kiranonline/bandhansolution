const Category = require("../models/Category");



//++++++++++++++++++++++++++++++++++++++ create category +++++++++++++++++++++++++++++++++++++
exports.createCategory = async(req,res,next)=>{
    try{
        let name = req.body.name.toLowerCase();
        let existingcategory = await Category.findOne({name:name})
        if(existingcategory){
            res.json({
                status : false,
                message : 'This category already exist'
            })
        }
        else{
            let category = new Category({
                name : name,
                isActive:true,
                createdBy : req.user._id
            })
            await category.save();
            res.json({
                status : true,
                message : 'Category created sucessfully.'
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




//++++++++++++++++++++++++++++++++++++++ list category +++++++++++++++++++++++++++++++++++++
exports.listCategory = async(req,res,next)=>{
    try{
        let query = {isActive:true};
        let pageNumber = req.body.pageNumber || 1;
        let pageSize = req.body.pageSize || 50;
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        console.log(pageNumber,pageSize)
        let [categories,totalCategorySize] = await Promise.all([Category.find(query).skip((pageNumber-1)*pageSize).limit(pageSize),Category.countDocuments(query)]);
        res.json({
            status : true,
            message : "Categories fetched sucessfully.",
            data : categories,
            total : totalCategorySize
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

exports.listCategoryForUsers = async(req,res,next) => {
    try{
        let category = await Category.find();
        if(category){
            res.json({
                status:true,
                data: category
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:false,
            message:"Server Error"
        })
    }
}