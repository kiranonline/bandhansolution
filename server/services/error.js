exports.formatRequestError = (errors)=>{
    let customerrors = errors.array().map(({msg,param})=>{
        return {
            msg,
            param
        }
    })
    return customerrors
}