import http from "../services/httpCall";

export const login = (token,userdetails) => {
    http.defaults.headers.common['Authorization']='Bearer '+ token;
    return {
        type: 'LOGIN',
        token : token,
        userdetails:userdetails
    };
};

export const logout = () => {
    localStorage.removeItem("Token");
    return {
        type: 'LOGOUT'
    };
};
  
export const setUserDetails = (user)=>{
    return {
        type : 'SET_USER_DETAILS',
        payload : user
    }
}