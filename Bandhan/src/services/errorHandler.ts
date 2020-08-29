
const Errorhandler = (error:any,cb:any)=>{
    try{
        console.log(error.response)
        if(error.response.status === 401){
            cb();
        }
        else if(error.response.status === 422){
            //message.error("Server Error!")
        }
        else{
            //message.error(error.response.data.message || "server error");
        }
    }
    catch(e){
        console.log(e)
        //message.error("Server Error!")
    }
}

export default Errorhandler;