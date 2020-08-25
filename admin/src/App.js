import React from "react";
import Loader from "./components/Loader/Loader";
import {connect} from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginWrapper from "./components/Root/LoginWrapper";
import PrivateRoute from "./components/Root/PrivateWrapper";
import Login from "./components/Login/Login";
import DashboardWrapper from "./components/Wrapper/DashboardWrapper";
import { login } from "./actions/authAction";



let App = (props)=>{
    //auth check if token exist
    let Token  = localStorage.getItem("Token");
    console.log(Token);
    if(Token && Token!=="null" && Token!=="undefined"){
      props.login(Token);
    }

    return(
        <React.Fragment>
            <Loader />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={{pathname: "/dashboard"}}/>
                    </Route>
                    <LoginWrapper exact={true} path="/login">
                        <Login />
                    </LoginWrapper>
                    <PrivateRoute path="/dashboard">
                        <DashboardWrapper />
                    </PrivateRoute>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    )
}


const mapStateToProps= (state) => ({
    
})
export default connect(mapStateToProps, { 
    login
})(App);