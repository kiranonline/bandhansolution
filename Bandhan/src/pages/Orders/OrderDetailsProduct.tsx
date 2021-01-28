import React from 'react';
import { IonCard,IonSkeletonText,IonButton,IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import moment from "moment";
import apis from '../../services/apis';
import { useTranslation } from 'react-i18next';

export default function OrderProduct(props:any) {
    const { t } = useTranslation();
    return (
        <IonCard className={"OrderProduct"}>
            <IonGrid>
                <IonRow>
                    <IonCol size="4">
                        <img src={`${apis.BASE_SERVER_URL}${props.data.product?.images[0]}`} className="cart-item-image"/>
                    </IonCol>
                    <IonCol size="8">
                        <h5 className="cart-item-name">{props.data.product.name}</h5>
                        <h6 className="cart-item-unit-price">{t('orderDetails.unitPrice')} : <span>&#8377;</span>{props.data.unitPrice}</h6>
                        <h6 className="cart-item-unit-price">{t('orderDetails.totalPrice')} : <span>&#8377;</span>{props.data.totalPrice}</h6>
                        <h6 className="cart-item-unit-price">{t('orderDetails.count')} : {props.data.count}</h6>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <div>
                <div className="timeline">
                    {props.data && Array.isArray(props.data.status) && props.data.status.map((ele:any,i:any)=>(
                        <div className={"container"+(i%2==0?" left":" right")} key={i}>
                            <div className="content">
                                <h2>{ele.name}</h2>
                                <p>{moment(ele.date).format("DD-MM-YYYY")}</p>
                                <p>{ele.remark}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </IonCard>
    )
}
