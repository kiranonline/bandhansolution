import React from 'react'
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
// import http from "../../services/httpCall";
// import apis from "../../services/apis";
import CartComponent from "../Checkout/CartComponent";
import CheckoutComponent from "../Checkout/CheckoutComponent";
import { logout, setUserDetails } from "../../actions/authAction"; 
import Dashboard from '../Wrapper/Dashboard';
import OrderSuccessful from '../Checkout/OrderSuccessful';
import OrderDetails from "../Order/OrderDetails"

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
                        <Dashboard location={props.location}/>
                    </Route> 
                    <Route exact={true} path="/order-success">
                        <OrderSuccessful location={props.location}/>
                    </Route>   
                    <Route exact={true} path="/order/:id">
                        <OrderDetails/>
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