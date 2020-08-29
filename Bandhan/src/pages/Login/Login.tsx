import React from "react";
import { IonContent, IonFab, IonFabButton, IonPage, IonInput, IonItem, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import "./Login.css";
import { personAddOutline,homeOutline } from 'ionicons/icons';

const Login = ()=>{
    return(
        <IonPage>
            <IonContent fullscreen={true} className="login-page-wrapper ion-padding">   
                <IonFab vertical="top" horizontal="end" slot="fixed">
                    <IonFabButton className="custom-back" routerLink="/signup">
                        <IonIcon icon={personAddOutline} />
                    </IonFabButton>
                </IonFab>
                <h3 className="signup-text">Welcome to</h3>              
                <img className="brand-logo" src={require("../../static/brand.png")} />
                <IonItem className="login-input">
                    <IonInput placeholder="Enter Phone Number" type="number"></IonInput>
                </IonItem>
                <IonItem className="login-input">
                    <IonInput placeholder="Enter Password" type="password"></IonInput>
                </IonItem>
                <IonButton expand="full" className="login-button normal">Login</IonButton>
                <IonButton expand="full" className="login-button google">
                    Login with google
                </IonButton>
                <IonButton expand="full" className="login-button facebook">
                   Login with Facebook
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Login;