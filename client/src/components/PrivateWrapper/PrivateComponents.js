import React,{useEffect} from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import http from "../../services/httpCall";
import apis from "../../services/apis";
import CartComponent from "../Checkout/CartComponent";
import CheckoutComponent from "../Checkout/CheckoutComponent";
import { logout, setUserDetails } from "../../actions/authAction"; 
import Dashboard from '../Wrapper/Dashboard';

function PrivateComponents(props) {

    return (
        <div>
                <Switch>
                    <Route exact={true} path="/cart">
                        <CartComponent />
                    </Route>
                    <Route exact={true} path="/checkout">
                        <CheckoutComponent />
                    </Route>
                    <Route exact={true} path="/profile">
                        <Dashboard />
                    </Route>                
                </Switch>
            {/* } */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    Auth: state.Auth,
});
  
export default connect(mapStateToProps, { 
    setUserDetails,
    logout
 })(PrivateComponents);
