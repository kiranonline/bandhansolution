import React from 'react';
import {IonSlides, IonSlide, IonContent } from "@ionic/react";
import apis from '../../services/apis';

export default function ProductImageSlide(props:any) {
    const slideOpts = {
        initialSlide: 1,
        speed: 400
    };

    return (
        <IonSlides pager={true} options={slideOpts} className="homepage-slider">
            {props.images.map((ele:any,i:any)=>
                <IonSlide key={i}>
                    <img src={`${apis.BASE_SERVER_URL}/${ele}`} />
                </IonSlide>
            )
            }
        </IonSlides>
    )
}
