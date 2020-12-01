import React from 'react'
import { connect } from "react-redux";
import { IonSkeletonText, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonFab, IonFabButton, IonGrid, IonCol, IonRow, IonCard } from '@ionic/react';
import { setGeoCordinates } from "../../actions/authAction"

function WeatherForeCast(props:any) {
    return (
        <>
        {props.Auth.weatherInfo.fetchingWeatherInfo?
            <IonSkeletonText animated style={{ width: '95%',margin:'auto',height:'200px' }}/>
            :
            <>
            {props.Auth.weatherInfo.isPermissionGranted?
                <div>
                    <div className="custom-weather-row" style={{marginBottom:'200px'}}>
                        <div className="custom-weather-col">
                            <IonCard className="weather-box">
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
                            </IonCard>
                        </div>
                        <div className="custom-weather-col">
                            <IonCard className="weather-box">
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
                            </IonCard>
                        </div>
                    </div>
                </div>
                :
                <div className="permission-not-granted-wrapper">
                    <h5>Location permission not granted</h5>
                    
                    <IonButton onClick={props.setGeoCordinates} className="grant-permission-button">Grant Permission</IonButton>
                </div>
            }
            </>
        }
            
            
        </>
        
    )
}

const mapStateToProps = (state: any) => ({
    Auth: state.Auth
})
export default connect(mapStateToProps, {
    setGeoCordinates
})(WeatherForeCast);