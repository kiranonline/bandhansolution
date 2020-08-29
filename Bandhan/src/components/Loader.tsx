import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { IonLoading, IonButton, IonContent } from '@ionic/react';





const Loader: React.FC = (props:any) =>{ 

  return(
    <IonLoading
        cssClass='my-custom-class'
        isOpen={props.loader.loading_active>0?true:false}
        message={'Please wait...'}
    />
  )
};



const mapStateToProps= (state:any) => ({
    loader : state.Loader
})

export default connect(mapStateToProps, { })(Loader);
