import React,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import PrivateRoute from "./components/Root/PrivateWrapper";
import LoginWrapper from "./components/Root/LoginWrapper";
import Home from './pages/Home';
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import { login } from "./actions/authAction";
import {connect} from 'react-redux';
import { Plugins } from '@capacitor/core';



const { Storage } = Plugins;






const App: React.FC = (props:any) =>{ 

  const getToken = async()=>{
    const Token = await Storage.get({ key: 'Token' });
    console.log(Token.value);
    if(Token.value && Token.value!=="null" && Token.value!=="undefined"){
      props.login(Token.value);
    }
  }

  
  getToken();

  return(
    <IonApp>
      <Loader />
      <IonReactRouter>
        <IonRouterOutlet>
          <LoginWrapper exact={true} path="/login">
            <Login />
          </LoginWrapper>
          <LoginWrapper exact={true} path="/signup">
            <Signup />
          </LoginWrapper>
          <PrivateRoute exact={true} path="/home">
            <Home />
          </PrivateRoute>
          <Route>
            <Redirect to="/home"/>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      <Toast />
    </IonApp>
  )
};




const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, { 
  login
})(App);
