import React,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet,  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import {connect} from 'react-redux';
import { home, calendar, personCircle, informationCircle } from 'ionicons/icons';
import Home from './pages/Home';



const SecureWrapper = ({match}:any)=>{

    
    return(
        <>
            <IonRouterOutlet>
                <Route 
                    exact={true} 
                    path={`${match.url}/home`}
                    component={Home}
                />
                <Route exact path={`${match.url}`} render={() => <Redirect to="/secure/home" />} />
            </IonRouterOutlet>
        </>

    )
}


const mapStateToProps= (state:any) => ({

})
export default connect(mapStateToProps, { 

})(SecureWrapper);