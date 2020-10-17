import React from 'react';
import { IonCard,IonSkeletonText,IonButton,IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import apis from '../services/apis';

export default function CartItem(props:any) {
    return (
        <div className="cart-item-wrapper">
            {props.data?
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="4">
                                <img src={`${apis.BASE_SERVER_URL}${props.data.images[0]}`} className="cart-item-image"/>
                            </IonCol>
                            <IonCol size="8">
                                <h5 className="cart-item-name">{props.data.name}</h5>
                                <h6 className="cart-item-unit-price">Unit Price : <span>&#8377;</span>{props.data.salePrice?props.data.salePrice:props.data.regularPrice}</h6>
                                <h6 className="cart-item-unit-price">Total Price : <span>&#8377;</span>{props.data.salePrice?parseFloat(props.data.salePrice)*(props.cart.count):parseFloat(props.data.regularPrice)*(props.cart.count)}</h6>
                                <div className="cart-item-controls">
                                    {
                                        props.cart.count===1?null:
                                        <IonButton onClick={()=>props.updateQty(props.cart._id,-1)} color="danger" size="small">-</IonButton>

                                    }
                                    <IonButton color="light" size="small" disabled={true}>{props.cart.count}</IonButton>
                                    <IonButton onClick={()=>props.updateQty(props.cart._id,1)} color="success" size="small" >+</IonButton>
                                    <IonButton onClick={()=>props.deleteItem(props.cart._id)} color="danger" size="small">Remove</IonButton>
                                </div>
                                
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
