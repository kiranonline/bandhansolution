const initialState = {
    loading_active : 0,
    toast_visible:false,
    toast_message:""
}

export default (state = initialState, action:any )=>{
    switch(action.type){
        case 'LOADING':
            let lc = state.loading_active;
            if(action.payload){
                lc++;
            }
            else{
                lc = lc===0?0:lc-1;
            }
            return {
                ...state,
                loading_active : lc              
            };
        case "START_TOAST":
            return{
                ...state,
                toast_visible:true,
                toast_message:action.payload
            };
        case "STOP_TOAST":
            return{
                ...state,
                toast_visible:false,
                toast_message:""
            };
        default:
            return state;
    }
}