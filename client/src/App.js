import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/Root/PrivateWrapper";
// import Loader from "./components/Loader/Loader";
import http from "./services/httpCall"
import apis from "./services/apis"
import {login,logout,setUserDetails} from "./actions/authAction";
import Footer from "./components/Footer/Footer";
import HomeComponent from "./components/Homepage/HomePage";
import PrivacyPolicyComponent from "./components/Footer/PrivacyPolicyComponent";
import PrivateComponent from "./components/PrivateWrapper/PrivateComponents";
import TermsComponent from "./components/Footer/TermsComponent";
import BrandHeader from './components/Homepage/BrandHeader';
import NavbarHeader from './components/Homepage/NavbarHeader';

// import './App.css';


function App(props) {

  //auth check if token exist
  let Token  = localStorage.getItem("Token");
  // console.log(Token);
  if(Token && Token!=="null" && Token!=="undefined"){
    props.login(Token);
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
            // Errorhandler(err,props.logout)
            props.logout()
        })
    }

    // fetching user details on component load
    useEffect(()=>{
            fetchUserDetails();
                
    },[])

  return (

    <React.Fragment>
            {/* <Loader /> */}
            <BrandHeader />
            <NavbarHeader />
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true}>
                      <HomeComponent />
                    </Route>
                    <Route path="/privacy" exact={true}>
                      <PrivacyPolicyComponent />
                    </Route>
                    <Route path="/terms" exact={true}>
                      <TermsComponent />
                    </Route>
                    <PrivateRoute path="/">
                        <PrivateComponent />
                    </PrivateRoute>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
            <Footer />
        </React.Fragment>
  );
}

const mapStateToProps= (state) => ({
    
})

export default connect(mapStateToProps, {
  login,
  logout,
  setUserDetails
})(App);
