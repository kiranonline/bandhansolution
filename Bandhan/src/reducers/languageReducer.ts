const initialState = {
    selectedlanguage : "en"
}

export default (state = initialState, action:any )=>{
    switch(action.type){
        case 'CHANGE_LANGUAGE':
            let lng = "en";
            if(action.payload=="hi" || action.payload=="bn"){
                lng = action.payload
            }
            return{
                ...state,
                selectedlanguage : lng
            }
        default:
            return state;
    }
}