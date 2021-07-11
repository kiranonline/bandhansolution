const { validationResult } =require("express-validator");

exports.errorHandler = (req,res,next)=>{
    try{
        console.log("i am called to check")
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({
                status : false,
                message : 'invalid inputs',
                errors : errors.array().map(({msg,param})=>{
                    return {
                        msg,
                        param
                    }
                })
            })
        }
        else{
            next();
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