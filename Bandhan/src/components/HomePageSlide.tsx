import React from 'react';
import {IonSlides, IonSlide, IonContent } from "@ionic/react";
import banner1 from "../static/sliders/banner1.jpg";
import banner2 from "../static/sliders/banner2.jpg";
import banner3 from "../static/sliders/banner3.jpg";

export default function HomePageSlide() {
    const slideOpts = {
        initialSlide: 1,
        speed: 400
    };

    return (
        <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
                <img src={banner1} />
            </IonSlide>
            <IonSlide>
                <img src={banner2} />
            </IonSlide>
            <IonSlide>
                <img src={banner3} />
            </IonSlide>
        </IonSlides>
    )
}
