const Products=require("../models/Product");


//++++++++++++++++++++++++++++++++++++++ Highlight Product (Depends on product_type) +++++++++++++++++++++++++++++++++++++
exports.producthighlight = async(req,res,next)=>{
    try{
        //Problem with onsale type.
        // console.log(req.query)
        let quantity= parseInt(req.query.limit);
        if(req.query.producttype==='new'){
            let products=await Products.find().sort({createdAt:-1}).limit(quantity);
            // console.log(products);
            res.json({
                stauts:true,
                data:products
            })
        }else if(req.query.producttype==='popular'){
            let products = await Products.find().sort({sold:-1}).limit(quantity);
            
            res.json({
                stauts:true,
                data:products
            })
        }else{
            let products= await Products.find().sort({}).limit(quantity);
            res.json({
                status:true,
                data:products
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