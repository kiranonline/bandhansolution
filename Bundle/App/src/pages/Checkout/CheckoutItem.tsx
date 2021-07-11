import React from 'react';
import { IonCard,IonSkeletonText,IonButton,IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import apis from '../../services/apis';
import { useTranslation } from 'react-i18next';


export default function CheckoutItem(props:any) {
    const { t } = useTranslation()


    return (
        <div className={"cart-item-wrapper"}>
            <IonCard className={(props.isOk?" okay":" not-okay")}>
                <IonGrid>
                    <IonRow>
                        <IonCol size="4">
                            <img src={`${apis.BASE_SERVER_URL}${props.data.images[0]}`} className="cart-item-image"/>
                        </IonCol>
                        <IonCol size="8">
                            <h5 className="cart-item-name">{props.data.name}</h5>
                            <h6 className="cart-item-unit-price">{t('orderDetails.unitPrice')} : <span>&#8377;</span>{props.data.salePrice?props.data.salePrice:props.data.regularPrice}</h6>
                            <h6 className="cart-item-unit-price">{t('orderDetails.totalPrice')} : <span>&#8377;</span>{props.data.salePrice?parseFloat(props.data.salePrice)*(props.cart?.count):parseFloat(props.data.regularPrice)*(props.cart?.count)}</h6>
                            <h6 className="cart-item-unit-price">{t('orderDetails.count')} : {props.cart?.count}</h6>
                            <div className="cart-item-controls">
                                <IonButton onClick={()=>props.deleteItem(props.data._id)} color="danger" size="small">
                                {t('orderDetails.removetext')}
                                </IonButton>
                            </div>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCard>
        </div>
    )
}