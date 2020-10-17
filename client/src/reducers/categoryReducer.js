const initialState = {
    category_list : []
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'FETCH_CATEGORIES':
            return {
                ...state,
                category_list : action.payload              
            };
        default:
            return state;
    }
}