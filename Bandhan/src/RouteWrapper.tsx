import React,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import {connect} from 'react-redux';
import { home } from 'ionicons/icons';




const RouterWrapper = ({Auth,...rest}:any)=>{

    
    return(
        <IonReactRouter>
            <IonRouterOutlet>
                <Route 
                    exact={true} 
                    path="/home"
                    render={props=>{
                        return Auth.isLoggedIn?<Home />:<Login />
                    }}
                />
                <Route exact={true} path="/login">
                    <Login />
                </Route>
                <Route exact={true} path="/signup">
                    <Signup />
                </Route>
                <Route exact={true} path="/">
                    <Redirect to="/home"/> 
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    )
}


const mapStateToProps= (state:any) => ({
    Auth:state.Auth
})
export default connect(mapStateToProps, { 

})(RouterWrapper);