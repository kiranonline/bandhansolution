const initialState = {
    loading : false
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'MODAL':
            console.log("aaya");
            return {
                ...state,
                loading : action.payload      
            };
        default:
            return state;
    }
}