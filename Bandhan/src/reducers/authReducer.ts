const initialState = {
    isLoggedIn : false,
    token : null,
    userdetails : null,
    weatherInfo:{
        cordinates : null,
        fetchingWeatherInfo : false,
        weatherData : null,
        isPermissionGranted : false
    },
    selectedlanguage : "en"
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
        case 'SET_GEO_CORDINATES_WEATHER_DATA':
            return{
                ...state,
                weatherInfo : {
                    ...state.weatherInfo,
                    cordinates : action.payload.cordinates,
                    fetchingWeatherInfo : false,
                    weatherData : action.payload.weatherData,
                    isPermissionGranted : true
                }
            }
        case 'FETCHING_WEATHER_DATA':
            return{
                ...state,
                weatherInfo : {
                    ...state.weatherInfo,
                    fetchingWeatherInfo : action.payload
                }
            }
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