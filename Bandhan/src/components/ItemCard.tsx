import React from 'react';
import { IonCard,IonSkeletonText,IonCardContent,IonGrid, IonRow, IonCol } from '@ionic/react';
import apis from "../services/apis";





export default function ItemCard(props:any) {
    return (
        <IonCard className="item-card-wrapper">
            {props.data?
                <>
                    <img src={`${apis.BASE_SERVER_URL}/${props.data!.images[0]}`} />
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol className="ion-no-padding ion-align-items-start">
                                    {props.data.name}
                                </IonCol>
                                <IonCol className="ion-no-padding ion-align-items-end">
                                    
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        
                        <div className="price-section">
                            yo          
                        </div>
                    </IonCardContent>
                </>
                :
                <IonSkeletonText animated style={{ width: '100%%',height:'200px' }}/>
            }
            
        </IonCard>
    )
}
