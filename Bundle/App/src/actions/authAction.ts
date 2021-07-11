import http from "../services/httpCall";
import { Plugins } from '@capacitor/core';
import apis from "../services/apis";
import axios from "axios";
const { Storage, Geolocation } = Plugins;



export const changeLanguage = (lang:string) =>async(dispatch:any) => {
    console.log(lang)
    await Storage.set({ key: 'default_language', value:lang });
    dispatch({
        type: 'CHANGE_LANGUAGE',
        payload:lang
    })
};


export const login = (token:any,userdetails:any) => {
    http.defaults.headers.common['Authorization']='Bearer '+ token;
    return {
        type: 'LOGIN',
        token : token,
        userdetails:userdetails
    };
};

export const logout = ()=> (dispatch:any) => {
    Storage.remove({ key: 'Token' }).then((result)=>{
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





// export const setGeoCordinates = ()=> (dispatch:any) =>{
//     console.log("fetching cordinates")
//     Geolocation.getCurrentPosition().then((cordinates:any)=>{
//         console.log("cordinates...",cordinates)
//         dispatch({
//             type : 'SET_GEO_CORDINATES',
//             payload : []
//         })
//     }).catch((err)=>{
//         console.log(err)
//         dispatch({
//             type : 'SET_GEO_CORDINATES',
//             payload : []
//         })
//     })

// }


export const setGeoCordinates = ()=> (dispatch:any) =>{
    console.log("fetching cordinates")
    dispatch({
        type : 'FETCHING_WEATHER_DATA',
        payload : true
    })
    Geolocation.getCurrentPosition().then((cordinates:any)=>{
        console.log("cordinates...",cordinates.coords);
        let { latitude,  longitude }:any = cordinates.coords
        axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apis.API_KEY_OPEN_WEATHER}`).then((weather)=>{
            console.log(weather.data)
            dispatch({
                type : 'SET_GEO_CORDINATES_WEATHER_DATA',
                payload : {
                    cordinates : {
                        latitude,
                        longitude
                    },
                    weatherData : weather.data
                }
            })
        }).catch((err)=>{
            console.log(err)
            dispatch({
                type : 'FETCHING_WEATHER_DATA',
                payload : false
            })
        })
    }).catch((err)=>{
        console.log(err)
        dispatch({
            type : 'FETCHING_WEATHER_DATA',
            payload : false
        })
    })
}