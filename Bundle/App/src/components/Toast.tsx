import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { IonToast } from '@ionic/react';
import {closeToast} from "../actions/loadingAction"




const Loader: React.FC = (props:any) =>{ 

    return(
        <IonToast
            isOpen={props.loader.toast_visible}
            onDidDismiss={() => props.closeToast()}
            message={props.loader.toast_message}
            duration={2000}
        />
    )
};



const mapStateToProps= (state:any) => ({
    loader : state.Loader
})

export default connect(mapStateToProps, { 
    closeToast
})(Loader);
