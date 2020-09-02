const Product = require("../models/Product");
const mongoose = require("mongoose")

//++++++++++++++++++++++++++++++++++++++ Product List +++++++++++++++++++++++++++++++++++++
exports.productlist = async(req,res,next) =>{
    try{
        const category=req.query.category;
        const search=req.query.search;
        const is_pricefilter=req.query.is_pricefilter;
        const sortType=req.query.sortType || "newest";
        const minprice = req.query.minprice;
        const maxprice = req.query.maxprice;
        console.log(minprice);

        let match={}
        let sortobject={}
        let project={}

        if(category){
            match.category = mongoose.Types.ObjectId(category);
        }else{
            match.$or= [{ name : new RegExp(search,'i') }, { description : new RegExp(search,'i') }];
        }

        if(is_pricefilter){
            project.category = 1;
            project.images = 1;
            project.name=1;
            project.description = 1;
            project.createdBy = 1;
            project.regularPrice = 1;
            project.salePrice = 1;
            project.createdAt = 1;
            project.updatedAt = 1;
            project.price = {
                $cond:{
                    if:{
                        $gte : ["$salePrice",0]
                    },
                        then: "$salePrice",
                        else: "$regularPrice"
                }
            }
        }


        if(sortType==="hightolowprice"){
            sortobject.regularPrice= -1
        }else if(sortType==="lowtohighprice"){
            sortobject.regularPrice = 1
        }else if(sortType==="newest"){
            sortobject.createdAt= -1
        }else if(sortType==="oldest"){
            sortobject.createdAt = 1
        }else if(sortType==="maxsold"){
            sortobject.sold = -1
        }else if(sortType==="minsold"){
            sortobject.sold = 1
        }
        
        let query = [];
        if(is_pricefilter){
            query = [
                {$match: match},
                {$project: project},
                {$sort: sortobject},
            ]
        }else{
            query = [
                {$match: match},
                {$sort: sortobject}
            ]
        }


        // console.log(query[2]);
        let pageNumber = req.body.pageNumber || 1;
        let pageSize = req.body.pageSize || 50;
        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);
        let startingIndex=(pageNumber-1)*pageSize;
        let products = await Product.aggregate(query).skip(startingIndex).limit(pageSize);
        res.json({
            status : true,
            message : "Products fetched sucessfully.",
            data : products
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


//++++++++++++++++++++++++++++++++++++++ Single Product +++++++++++++++++++++++++++++++++++++
exports.singleProduct = async(req,res,next) =>{
    console.log(req.params);
    try{
        let product_id=req.params.id;
        let product = await Product.findOne({_id:product_id,isActive:true});
        console.log(product);
        if(product){
                res.json({
                    status: true,
                    data: product
                })

        }else{
            res.json({
                status: false,
                message: "Product not found"
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