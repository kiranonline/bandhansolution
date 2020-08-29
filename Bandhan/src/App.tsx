import React,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import { login } from "./actions/authAction";
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

  console.log("1")
  getToken();

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
  login
})(App);
