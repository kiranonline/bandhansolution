import React from 'react';
import { IonAvatar, IonIcon, IonItem, IonLabel, IonContent } from '@ionic/react';
import StandardImage from "../static/standard2.jpg";
import apis from "../services/apis"
import { personCircleOutline } from 'ionicons/icons';





export default function ProfilePageImage(props:any) {
    return (
        <>
            <div className="profilePage-bg-wrapper">
                <img src={StandardImage} />
                <div className="profilePage-bg-overlay"></div>
            </div>
            <div className="profilePage-avatar-wrapper">
                <IonAvatar className="profilePage-profile-avatar">
                    {(props.data && props.data.avatar)?
                        <img className="profilePage-profile-image" src={`${apis.BASE_SERVER_URL}${props.data.avatar}`} />
                        
                        :
                        <IonIcon className="profilePage-profile-image-not-present" icon={personCircleOutline} />
                    }
                </IonAvatar>
            </div>
            
        </>
    )
}
