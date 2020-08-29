import http from "../services/httpCall";
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


export const login = (token:any,userdetails:any) => {
    http.defaults.headers.common['Authorization']='Bearer '+ token;
    return {
        type: 'LOGIN',
        token : token,
        userdetails:userdetails
    };
};

export const logout = ()=> (dispatch:any) => {
    //localStorage.removeItem("Token");
    Storage.remove({ key: 'Token' }).then((result)=>{
        console.log(result);
        dispatch({
            type: 'LOGOUT'
        })
    })
};
  
export const setUserDetails = (user:any)=>{
    return {
        type : 'SET_USER_DETAILS',
        payload : user
    }
}