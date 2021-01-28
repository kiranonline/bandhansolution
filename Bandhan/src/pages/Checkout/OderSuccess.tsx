import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonLabel, IonToolbar,IonItem, IonGrid, IonIcon,IonButtons, IonButton, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import {useHistory} from "react-router-dom"
import { useTranslation } from 'react-i18next';


export default function OderSuccess() {
    const history = useHistory()
    const gohome = ()=>{
        history.push("/secure/home")
    }
    const { t } = useTranslation()


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonTitle className="custom-heading-text">
                    {t('orderDetails.orderSuccess')}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{width:'100%',padding:'10px',textAlign:"center"}}>
                    <h4>{t('orderDetails.orderSuccessMessage')}</h4>
                    <IonButton onClick={gohome} className="go-home">
                    {t('homePage.headerText')}
                    </IonButton>
                </div>

            </IonContent>
        </IonPage>
    )
}
