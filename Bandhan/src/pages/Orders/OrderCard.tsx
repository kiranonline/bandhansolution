import React from 'react';
import { IonCard,IonSkeletonText,IonButton,IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import bag from "../../static/order.svg";
import moment from "moment";


export default function OrderCard(props:any) {
    return (
        <div className="cart-item-wrapper">
            {props.data?
                <IonCard onClick={()=>props.vieworder(props.data._id)}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="3">
                                <img src={bag} className="order-item-image"/>
                            </IonCol>
                            <IonCol size="9">
                                <h6 className="order-item-id">Id : {props.data._id}</h6>
                                <h6 className="order-item-date">Order On : {moment(props.data.createdAt).format("DD-MM-YYYY")}</h6>
                                <h6 className="order-item-date">deliver To : {props.data.address?.city}, {props.data.address?.pincode}</h6>                                
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                :
                <IonSkeletonText animated style={{ width: '100%%',height:'100px' }}/>
            }
        </div>
    )
}
