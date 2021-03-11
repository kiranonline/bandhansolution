import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/Root/PrivateWrapper";
// import Loader from "./components/Loader/Loader";
import http from "./services/httpCall"
import apis from "./services/apis"
import {login,logout,setUserDetails} from "./actions/authAction";
import {fetchCategories} from "./actions/categoryAction";
import Footer from "./components/Footer/Footer";
import HomeComponent from "./components/Homepage/HomePage";
import PrivacyPolicyComponent from "./components/Footer/PrivacyPolicyComponent";
import PrivateComponent from "./components/PrivateWrapper/PrivateComponents";
import TermsComponent from "./components/Footer/TermsComponent";
import BrandHeader from './components/Homepage/BrandHeader';
import NavbarHeader from './components/Homepage/NavbarHeader';
import ProductListComponent from './components/Products/ProductListComponent';
import SingleProductComponent from './components/Products/SingleProductComponent';
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import WhatsappButton from "./components/Extra/WhatsappButton"
import Validateotp from './components/Validateotp/Validateotp';
import ChangePassword from './components/ChangePassword/ChangePassword';
// import './App.css';


function App(props) {

  //auth check if token exist
  let Token  = localStorage.getItem("Token");
  // console.log(Token);
  if(Token && Token!=="null" && Token!=="undefined"){
    props.login(Token);
  }

  let fetchUserDetails = ()=>{
    if(Token && Token!=="null" && Token!=="undefined"){
      http.get(apis.GET_USER_DETAILS).then((result)=>{
        console.log(result.data.data);
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
        
    }

  let fetchCategories = () => {
    http.get(apis.GET_CATEGORY_LIST)
    .then((result)=>{
      console.log(result);
      if(result.data.status){
        props.fetchCategories(result.data.data);
      }else{
        console.log(result.data.message);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

    // fetching user details on component load
    useEffect(()=>{
      fetchUserDetails();
      fetchCategories();
    },[])

  return (

    <React.Fragment>
            {/* <Loader /> */}
            
            <BrowserRouter>
                <BrandHeader />
                <NavbarHeader />
                <Switch>
                    <Route path="/" exact={true}>
                      <HomeComponent />
                    </Route>
                    <Route path="/privacy">
                      <PrivacyPolicyComponent />
                    </Route>
                    <Route path="/products">
                      <ProductListComponent />
                    </Route>
                    <Route path="/product/:id">
                      <SingleProductComponent />
                    </Route>
                    <Route path="/terms">
                      <TermsComponent />
                    </Route>
                    <Route exact path="/forgotpassword">
                      <ForgotPassword />
                    </Route>
                    <PrivateRoute path="/">
                        <PrivateComponent location={props.location}/>
                    </PrivateRoute>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
            <Footer />
            <WhatsappButton />

        </React.Fragment>
  );
}

const mapStateToProps= (state) => ({
    
})

export default connect(mapStateToProps, {
  login,
  logout,
  setUserDetails,
  fetchCategories
})(App);
