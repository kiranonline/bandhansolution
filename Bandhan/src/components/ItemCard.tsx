import React from 'react';
import { IonCard,IonSkeletonText,IonCardContent,IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import apis from "../services/apis";
import {useHistory} from "react-router-dom"
import { starOutline, star } from 'ionicons/icons';




export default function ItemCard(props:any) {
    const history = useHistory()

    const goTo =()=>{
        history.push(`/secure/product/${props.data._id}`)
    }  

    return (
        <div className="item-card-wrapper">
            {props.data?
                <div onClick={goTo} >
                    <img src={`${apis.BASE_SERVER_URL}/${props.data!.images[0]}`} />
                    <div>
                        <h6 className="itemName">
                            {props.data.name}
                        </h6>
                        <div className="itemStars">
                            <IonIcon icon={star} className="item-star"/>
                            <IonIcon icon={star} className="item-star" />
                            <IonIcon icon={star} className="item-star" />
                            <IonIcon icon={starOutline} className="item-star" />
                            <IonIcon icon={starOutline} className="item-star" />
                        </div>
                        <div className="item-price-section">
                            {props.data.salePrice?
                                <>
                                    <span className="price-striked-wrapper">
                                        <span className="price-striked-inner"><span>&#8377;</span>{props.data.regularPrice}</span>
                                    </span>
                                    <span className="price-striked-inner actual-price"><span>&nbsp;&#8377;</span>{props.data.salePrice}</span>
                                </>
                                :
                                <span className="price-striked-inner actual-price"><span>&nbsp;&#8377;</span>{props.data.regularPrice}</span>

                            }
                        </div>
                    </div>
                </div>
                :
                <IonSkeletonText animated style={{ width: '100%%',height:'200px' }}/>
            }
            
        </div>
    )
}
