const initialState = {
    loading : false
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'MODAL':
            return {
                ...state,
                loading : action.payload      
            };
        default:
            return state;
    }
}