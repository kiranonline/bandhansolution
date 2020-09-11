import React from 'react'
import {IonCard, IonInput, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pencil } from 'ionicons/icons';



export default function UserDetailsCard(props:any) {

    return (
        <div>
            <IonCard className="profilePage-user-details-card">
                <IonItem className={"profilePage-input" }>
                    <IonInput 
                        type="text"
                        name="name"
                        value={props.data?props.data.name:""}
                        disabled={true}
                    ></IonInput>
                    <IonIcon icon={pencil}></IonIcon>
                </IonItem>
                <IonItem className={"profilePage-input" }>
                    <IonInput 
                        type="email"
                        name="email"
                        value={props.data?props.data.email:""}
                        disabled={true}
                    ></IonInput>
                    <IonIcon icon={pencil}></IonIcon>
                </IonItem>
                <IonItem className={"profilePage-input" }>
                    <IonInput 
                        type="text"
                        name="phoneNumber"
                        value={props.data?props.data.phoneNumber:""}
                        disabled={true}
                    ></IonInput>
                    <IonIcon icon={pencil}></IonIcon>
                </IonItem>
            </IonCard>
        </div>
    )
}
