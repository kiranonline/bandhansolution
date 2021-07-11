const Product = require("../models/Product");
const Stock = require("../models/Stock");
const {createStockForNewProduct} = require("../services/stock")
const mongoose = require("mongoose")



//kiran


//++++++++++++++++++++++++++++++++++++++ create product by admin +++++++++++++++++++++++++++++++++++++
exports.createProduct = async(req,res,next)=>{
    try{
        let product = new Product({
            name : req.body.name,
            category : req.body.category,
            description : req.body.description,
            images : req.body.images,
            regularPrice : req.body.regularPrice,
            salePrice : req.body.salePrice,
            createdBy : req.user._id,
            isActive : true,
            properties:req.body.properties,
            productVideo : req.body.productVideo
        })
        console.log(product);
        let savedproduct = await product.save();
        console.log(savedproduct);
        createStockForNewProduct(savedproduct._id)
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




//++++++++++++++++++++++++++++++++++++++ edit product by admin +++++++++++++++++++++++++++++++++++++
exports.editProduct = async(req,res,next)=>{
    try{
        let id = req.params.id;
        console.log(id)
        let product = {
            name : req.body.name,
            category : req.body.category,
            description : req.body.description,
            images : req.body.images,
            regularPrice : req.body.regularPrice,
            salePrice : req.body.salePrice,
            createdBy : req.user._id,
            isActive : true,
            properties:req.body.properties,
            productVideo : req.body.productVideo
        }
        console.log(product);
        let savedProduct = await Product.findByIdAndUpdate(id,product)
        console.log(savedProduct)
        res.json({
            status : true,
            message : 'Product updated sucessfully.'
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



//++++++++++++++++++++++++++++++++++++++ list products for amdin+++++++++++++++++++++++++++++++++++++
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




exports.stockListForAdmin = async(req,res,next)=>{
    try{
        let productId=req.body.productId; 
        let query = {product:productId};
        let pageNumber = req.body.pageNumber || 1;
        let pageSize = req.body.pageSize || 50;
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        console.log(pageNumber,pageSize)
        let [stocks,totalStockSize] = await Promise.all([Stock.find(query).skip((pageNumber-1)*pageSize).limit(pageSize).populate("seller","name email phoneNumber deliverTo"),Stock.countDocuments(query)]);
        res.json({
            status : true,
            message : "Products stocks sucessfully.",
            data : stocks,
            total : totalStockSize
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


//++++++++++++++++++++++++++++++++++++++ product details for admin +++++++++++++++++++++++++++++++++++++
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











//++++++++++++++++++++++++++++++++++++++ list products for seller+++++++++++++++++++++++++++++++++++++
exports.listProductsForSeller = async(req,res,next)=>{
    try{ 
        let query = {
            isActive:true,
            seller : req.user._id
        };
        let pageNumber = req.body.pageNumber || 1;
        let pageSize = req.body.pageSize || 50;
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        console.log(pageNumber,pageSize)
        let [products,totalProductsSize] = await Promise.all([
            Stock.aggregate([
                {
                    $match : query
                },
                {
                    $skip : ((pageNumber-1)*pageSize)
                },
                {
                    $limit : pageSize
                },
                {
                    $lookup : {
                        from : 'products',
                        localField : 'product',
                        foreignField : '_id',
                        as : 'product'
                    }
                },
                {
                    $unwind:{
                        path : '$product'
                    }
                },
                {
                    $lookup : {
                        from : 'categories',
                        localField : 'product.category',
                        foreignField : '_id',
                        as : 'category'
                    }
                },
                {
                    $project:{
                        "name":"$product.name",
                        "images":"$product.images",
                        "regularPrice":"$product.regularPrice",
                        "salePrice":"$product.salePrice",
                        "stockUpdated":"$updatedAt",
                        "category":1,
                        "stock":1,
                        "productId":"$product._id",
                        
                    }
                }
            ]),
            Stock.countDocuments(query)
        ]);
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







//++++++++++++++++++++++++++++++++++++++ product details for admin +++++++++++++++++++++++++++++++++++++
exports.productDetailsForSeller = async(req,res,next)=>{
    try{
        let id = req.params.id;
        let query = {
            product : mongoose.Types.ObjectId(id),
            isActive:true,
            seller : req.user._id
        };
        console.log(query)
        let product = await Stock.aggregate([
            {
                $match : query
            },
            {
                $lookup : {
                    from : 'products',
                    localField : 'product',
                    foreignField : '_id',
                    as : 'product'
                }
            },
            {
                $unwind:{
                    path : '$product'
                }
            },
            {
                $lookup : {
                    from : 'categories',
                    localField : 'product.category',
                    foreignField : '_id',
                    as : 'category'
                }
            },
            {
                $project:{
                    "name":"$product.name",
                    "images":"$product.images",
                    "regularPrice":"$product.regularPrice",
                    "salePrice":"$product.salePrice",
                    "stockUpdated":"$updatedAt",
                    "category":1,
                    "stock":1,
                    "description" : "$product.description",
                    "properties":"$product.properties"
                }
            }
        ])
        console.log(product);
        if(product.length>0){
            res.json({
                status : true,
                message : "Products details fetched sucessfully.",
                data : product[0]
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








//++++++++++++++++++++++++++++++++++++++ create product by admin +++++++++++++++++++++++++++++++++++++
exports.updateProductStockBySeller = async(req,res,next)=>{
    try{
        let {id,stock} = req.body;
        let updatedStock = await Stock.findOneAndUpdate(
            {
                _id : mongoose.Types.ObjectId(id),
                isActive:true,
                seller : req.user._id

            },
            {
                stock : stock
            },
            {
                new : true
            }
        )
        console.log(updatedStock)
        if(updatedStock){
            res.json({
                status : true,
                message : "stock updated sucessfully."
            })
        }
        else{
            res.json({
                status : false,
                message : "Invalid details."
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