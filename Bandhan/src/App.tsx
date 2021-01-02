import React,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import apis from "./services/apis";
import http from "./services/httpCall"
import { login, setUserDetails,logout, setGeoCordinates } from "./actions/authAction";
import {connect} from 'react-redux';
import { Plugins } from '@capacitor/core';
import RouterWrapper from "./RouteWrapper";
const { Storage } = Plugins;






const App: React.FC = (props:any) =>{ 

  const getToken = async()=>{
    const Token = await Storage.get({ key: 'Token' });
    console.log(Token.value);
    if(Token.value && Token.value!=="null" && Token.value!=="undefined"){
      props.login(Token.value);
    }
  }


  let fetchUserDetails = ()=>{
    http.get(apis.GET_USER_DETAILS).then((result)=>{
      console.log(result);
      if(result.data.status){
          props.setUserDetails(result.data.data);
      }
      else{
          props.logout();
      }
    }).catch((err)=>{
      console.log(err);
      props.logout()
    })
  }

  console.log("1")
  getToken();


  useEffect(()=>{
    fetchUserDetails();
    props.setGeoCordinates()
  },[])


  return(
    <IonApp>
      <Loader />
      <RouterWrapper />
      <Toast />
    </IonApp>
  )
};




const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, { 
  login,
  setUserDetails,
  logout,
  setGeoCordinates
})(App);
