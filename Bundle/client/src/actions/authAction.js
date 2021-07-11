import http from "../services/httpCall";
import apis from "../services/apis";
import axios from "axios"

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




export const setGeoCordinates = ()=> (dispatch) =>{
    console.log("fetching cordinates")
    dispatch({
        type : 'FETCHING_WEATHER_DATA',
        payload : true
    })
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position.coords);
            let { latitude,  longitude } = position.coords;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apis.API_KEY_OPEN_WEATHER}`).then((weather)=>{
                //axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lat=${latitude}&lon=${longitude}&cnt=4&appid=${apis.API_KEY_OPEN_WEATHER}`).then((weather)=>{
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
        },
        (err)=>{
            console.log(err);
            dispatch({
                type : 'FETCHING_WEATHER_DATA',
                payload : false
            })
        });
    } else {
        dispatch({
            type : 'FETCHING_WEATHER_DATA',
            payload : false
        })
    }
}