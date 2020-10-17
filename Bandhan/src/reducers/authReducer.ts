const initialState = {
    isLoggedIn : false,
    token : null,
    userdetails : null          
}

export default (state = initialState, action:any )=>{
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn : true,
                token : action.token,
                userdetails : action.userdetails
            }
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn : false,
                token : null,
                userdetails : null
            }
        case 'SET_USER_DETAILS':
            return{
                ...state,
                userdetails : action.payload
            }
        default:
            return state;
    }
}