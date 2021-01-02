import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonLabel, IonToolbar,IonItem, IonGrid, IonIcon,IonButtons, IonButton, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import {useHistory} from "react-router-dom"

export default function OderSuccess() {
    const history = useHistory()
    const gohome = ()=>{
        history.push("/secure/home")
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonTitle className="custom-heading-text">Order Success</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{width:'100%',padding:'10px',textAlign:"center"}}>
                    <h4>your order is placed suceffully</h4>
                    <IonButton onClick={gohome} className="go-home">Home</IonButton>
                </div>
                
            </IonContent>
        </IonPage>
    )
}
