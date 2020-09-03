const path = require("path");


//kiran


//pupload file
exports.UploadFile = async(req,res,next)=>{
    try{
        console.log(req.file);
        let img_path = path.relative(path.join(__dirname,"../public"),req.file.path)
        console.log(img_path);
        if(req.file){
            res.json({
                status : true,
                message : "file uploaded sucessfully",
                file : `/${img_path}`
            })
        }  
        else{
            res.json({
                status : false,
                message : 'Invalid file.'
            })
        }         
    }
    catch(err){
        console.log(err);
        res.json({
            status : false,
            message : 'server error.'
        })
    }
}