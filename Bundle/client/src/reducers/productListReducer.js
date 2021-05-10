const initialState = {
    product_list : []
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                product_list : action.payload              
            };
        default:
            return state;
    }
}