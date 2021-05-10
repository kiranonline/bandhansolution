const path = require("path");
const fs = require("fs")


//upload poster
exports.UploadPoster = async(req,res,next)=>{
    try{
        const files = fs.readdirSync(path.join(__dirname,"../public/images/posters"));
        res.json({
            status:true,
            message:"poster uploaded sucessfully",
            data:files.map((ele,i)=>`/images/posters/${ele}`)
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status : false,
            message : 'server error.'
        })
    }
}


//list posters
exports.Listposter = async(req,res,next)=>{
    try{
        const files = fs.readdirSync(path.join(__dirname,"../public/images/posters"));
        res.json({
            status:true,
            message:"poster fetched sucessfully",
            data:files.map((ele,i)=>`/images/posters/${ele}`)
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status : false,
            message : 'server error.'
        })
    }
}




//delete posters
exports.DeletePoster = async(req,res,next)=>{
    try{
        const file = path.join(__dirname,"../public",req.body.file);
        console.log(file)
        fs.unlinkSync(file)
        const files = fs.readdirSync(path.join(__dirname,"../public/images/posters"));
        res.json({
            status:true,
            message:"poster fetched sucessfully",
            data:files.map((ele,i)=>`/images/posters/${ele}`)
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status : false,
            message : 'server error.'
        })
    }
}