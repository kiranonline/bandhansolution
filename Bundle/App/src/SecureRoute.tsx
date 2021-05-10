import React,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet,  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import {connect} from 'react-redux';
import { home,cube, bandage, cart, person } from 'ionicons/icons';

import Home from './pages/Home/Home';
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import SearchPage from "./pages/Search/SearchPage";
import SearcResult from "./pages/Search/SearchResult";
import Checkout from "./pages/Checkout/CheckoutComponent"
import OderSuccess from "./pages/Checkout/OderSuccess";
import OrderList from "./pages/Orders/OrderList";
import OrderDetails from "./pages/Orders/OrderDetails"


const SecureWrapper = ({match}:any)=>{

    
    return(
        <>
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/secure/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="cart" href="/secure/cart">
                    <IonIcon icon={cart} />
                    <IonLabel>Cart</IonLabel>
                </IonTabButton>

                <IonTabButton tab="Orders" href="/secure/order-list">
                    <IonIcon icon={cube} />
                    <IonLabel>Orders</IonLabel>
                </IonTabButton>

            
                <IonTabButton tab="profile" href="/secure/profile">
                    <IonIcon icon={person} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>


            <IonRouterOutlet>
                <Route 
                    exact={true} 
                    path={`${match.url}/home`}
                    component={Home}
                />
                <Route 
                    exact={true} 
                    path={`${match.url}/cart`}
                    component={Cart}
                />
                <Route 
                    exact={true} 
                    path={`${match.url}/profile`}
                    component={Profile}
                />
                <Route 
                    path={`${match.url}/product/:id`}
                    component={Product}
                />
                <Route 
                    path={`${match.url}/search`}
                    component={SearchPage}
                    exact={true} 
                />
                <Route 
                    path={`${match.url}/products`}
                    component={SearcResult}
                />
                <Route 
                    exact={true} 
                    path={`${match.url}/checkout`}
                    component={Checkout}
                />
                <Route 
                    exact={true} 
                    path={`${match.url}/order-success`}
                    component={OderSuccess}
                />
                <Route 
                    exact={true} 
                    path={`${match.url}/order-list`}
                    component={OrderList}
                />
                <Route 
                    path={`${match.url}/order-details/:id`}
                    component={OrderDetails}
                />
                <Route exact path={`${match.url}`} render={() => <Redirect to="/secure/home" />} />
            </IonRouterOutlet>


        </IonTabs>
        </>

    )
}


const mapStateToProps= (state:any) => ({

})
export default connect(mapStateToProps, { 

})(SecureWrapper);