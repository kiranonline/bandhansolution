import React,{useState,useEffect} from "react";
import { IonContent, IonFab, IonFabButton, IonPage, IonInput, IonItem, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import "./Signup.css";
import { arrowBackCircle,homeOutline } from 'ionicons/icons';

import MainSignUp from "./MainSignUp";
import SignUpOTP from "./SignUpOTP"

const Signup = ()=>{
    const [formState,setFormState] = useState(1);
    const [userId,setUserId] = useState();
    
    const changeFromState = (state:number,id:any)=>{
        setFormState(state);
        setUserId(id);
    }


    useEffect(()=>{
        console.log(userId)
    },[userId])
    
    return(
        <IonPage>
            <IonContent fullscreen={true} className="signup-page-wrapper ion-padding">   
                <IonFab vertical="top" horizontal="start" slot="fixed">
                    <IonFabButton className="custom-back" routerLink="/login">
                        <IonIcon icon={arrowBackCircle} />
                    </IonFabButton>
                </IonFab>
                {/* <h3 className="signup-text">Welcome to</h3>              */}
                <img className="brand-logo" src={require("../../static/brand-logo-actual.png")} />
                {formState===1?
                        <MainSignUp  changeFromState={changeFromState}/>
                    :
                        <SignUpOTP userId={userId} changeFromState={changeFromState}/>
                }
            </IonContent>
        </IonPage>
    )
}

export default Signup;