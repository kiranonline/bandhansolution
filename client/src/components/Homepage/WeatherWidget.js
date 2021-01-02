import React, {useState,useEffect} from 'react';
import { connect } from "react-redux";
import { setGeoCordinates } from "../../actions/authAction";
import Skeleton from 'react-loading-skeleton';
import "./Weather.css"

function WeatherWidget(props) {

    useEffect(()=>{
        props.setGeoCordinates()
    },[])

    return (
        <>
            {props.Auth.weatherInfo.fetchingWeatherInfo?
                <Skeleton height={300} />
                :
                <>
                    {props.Auth.weatherInfo.isPermissionGranted?
                        <div>
                            <div className="custom-weather-row">
                                <div className="custom-weather-col">
                                    <div className="weather-box">
                                        <div className="card wb-c">
                                            <img className="weather-box-icon" src={require("../../static/icons/temperature.svg")} />
                                            <h5 style={{color:'red'}}>{props.Auth.weatherInfo.weatherData.main.temp}&#176; C</h5>
                                            <div className="custom-weather-row custom-weather-inner-row">
                                                <p style={{color:'red'}}>
                                                    {props.Auth.weatherInfo.weatherData.main.temp_min}&#176; C
                                                </p>
                                                <p style={{color:'red'}}>
                                                    {props.Auth.weatherInfo.weatherData.main.temp_max}&#176; C
                                                </p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="custom-weather-col">
                                    <div className="weather-box">
                                        <div className="card wb-c">
                                            <img className="weather-box-icon" src={require("../../static/icons/wind.svg")} />
                                            <h5 style={{color:'#1A81DB'}}>{props.Auth.weatherInfo.weatherData.wind.speed}m/s</h5>
                                            <div className="custom-weather-row custom-weather-inner-row">
                                                <p style={{color:'#1A81DB'}}>
                                                    {props.Auth.weatherInfo.weatherData.wind.deg}&#176;
                                                </p>
                                                <p style={{color:'#1A81DB'}}>
                                                    {props.Auth.weatherInfo.weatherData.wind.speed} m/s
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="permission-not-granted-wrapper">
                            <h5>Location permission not granted or device location is not turned on</h5>
                            <button onClick={props.setGeoCordinates} className="btn grant-permission-button">Grant Permission</button>
                        </div>
                    }
                </>
            }   
        </>
    )
}


const mapStateToProps = (state) => ({
    Auth: state.Auth,

});
  
export default connect(mapStateToProps, {
    setGeoCordinates
})(WeatherWidget);