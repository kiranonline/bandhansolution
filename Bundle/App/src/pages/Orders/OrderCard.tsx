import React from 'react';
import { IonCard,IonSkeletonText,IonButton,IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import bag from "../../static/order.svg";
import moment from "moment";
import { useTranslation } from 'react-i18next';

export default function OrderCard(props:any) {
    const { t } = useTranslation();


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
                                <h6 className="order-item-id">{t('orderCard.id')} : {props.data._id}</h6>
                                <h6 className="order-item-date">{t('orderCard.orderedOn')} : {moment(props.data.createdAt).format("DD-MM-YYYY")}</h6>
                                <h6 className="order-item-date">{t('orderCard.deliverTo')} : {props.data.address?.city}, {props.data.address?.pincode}</h6>
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
