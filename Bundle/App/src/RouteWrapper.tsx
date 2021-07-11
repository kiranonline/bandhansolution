import React,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import SecureWrapper from "./SecureRoute";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import {connect} from 'react-redux';
import { home } from 'ionicons/icons';




const RouterWrapper = ({Auth,...rest}:any)=>{
    console.log(Auth.isLoggedIn)

    
    return(
        <IonReactRouter>
            <IonRouterOutlet>
                <Route 
                    path="/secure"
                    render={props=>{
                        console.log("hi")
                        return Auth.isLoggedIn?<SecureWrapper {...props} />:<Login />
                    }}
                />
                <Route 
                    path="/login"
                    render={props=>{
                        return Auth.isLoggedIn?<Redirect to="/secure/home"/>:<Login />
                    }}
                />
                <Route 
                    path="/signup"
                    render={props=>{
                        return Auth.isLoggedIn?<Redirect to="/secure/home"/>:<Signup />
                    }}
                />
                <Route exact path="/" render={() => <Redirect to="/secure/home" />} />
            </IonRouterOutlet>
        </IonReactRouter>
    )
}


const mapStateToProps= (state:any) => ({
    Auth:state.Auth
})
export default connect(mapStateToProps, { 

})(RouterWrapper);