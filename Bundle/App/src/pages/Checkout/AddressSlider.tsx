import React from 'react';
import {IonSlides, IonSlide, IonContent, IonSkeletonText, IonButton } from "@ionic/react";
import { useTranslation } from 'react-i18next';

export default function AddressSlider(props:any) {
    const slideOpts = {
        initialSlide: 1,
        speed: 400
    };
    const { t } = useTranslation()


    return (
        <div>
            <IonSlides pager={true} options={slideOpts} className="homepage-slider">
                {props.addresses.map((ele:any,i:any)=>
                    <IonSlide key={i}>
                        {ele?
                            <div className={"address-card-checkout" + (ele.isdefault?" default-address":"") } >
                                <h6>
                                    {`
                                        ${ele.lineone},
                                        ${ele.locality}
                                    `}
                                </h6>
                                <h6>{`${ele.city}, ${ele.district}`}</h6>
                                <h6>{`${ele.state}, ${ele.country}, ${ele.pincode}`}</h6>
                                {!ele.isdefault &&
                                    <IonButton onClick={()=>props.changeDefaultAddress(ele._id)} className="makde-default-address-button">
                                        {t('addresspage.makeDefault')}
                                    </IonButton>}
                            </div>
                            :
                            <IonSkeletonText animated style={{ width: '100%%',height:'100px' }}/>
                        }
                    </IonSlide>
                )}

            </IonSlides>
        </div>
    )
}
