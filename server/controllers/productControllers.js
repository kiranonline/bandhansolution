const Product = require("../models/Product");


//++++++++++++++++++++++++++++++++++++++ create user +++++++++++++++++++++++++++++++++++++
exports.createProduct = async(req,res,next)=>{
    try{
        let product = new Product({
            name : req.body.name,
            category : req.body.category,
            description : req.body.description,
            images : req.body.images,
            regularPrice : req.body.regularPrice,
            salePrice : req.body.salePrice,
            weight : req.body.weight,
            createdBy : req.user._id,
            isActive : true
        })
        console.log(product);
        let savedproduct = await product.save();
        console.log(savedproduct);
        res.json({
            status : true,
            message : 'Product Created sucessfully.'
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





//++++++++++++++++++++++++++++++++++++++ list products +++++++++++++++++++++++++++++++++++++
exports.listProductsForAdmin = async(req,res,next)=>{
    try{ 
        let query = {isActive:true};
        let pageNumber = req.body.pageNumber || 1;
        let pageSize = req.body.pageSize || 50;
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        console.log(pageNumber,pageSize)
        let [products,totalProductsSize] = await Promise.all([Product.find(query).skip((pageNumber-1)*pageSize).limit(pageSize).populate("category","name").select("name category images regularPrice salePrice createdAt"),Product.countDocuments(query)]);
        res.json({
            status : true,
            message : "Products fetched sucessfully.",
            data : products,
            total : totalProductsSize
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





//++++++++++++++++++++++++++++++++++++++ product details by admin +++++++++++++++++++++++++++++++++++++
exports.productDetailsForAdmin = async(req,res,next)=>{
    try{
        let id = req.params.id;
        let product = await Product.findById(id).populate("category","name"); 
        console.log(product);
        if(product){
            res.json({
                status : true,
                message : "Products details fetched sucessfully.",
                data : product
            })
        }
        else{
            res.json({
                status : false,
                message : "Invalid Product Id."
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