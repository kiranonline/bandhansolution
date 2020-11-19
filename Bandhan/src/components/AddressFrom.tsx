import React,{ useState } from 'react';
import {IonCard, IonModal, IonInput, IonHeader, IonItem,IonIcon, IonToolbar, IonButtons, IonButton, IonContent, IonTitle } from '@ionic/react';
import {loading,openToast} from "../actions/loadingAction";
import { setUserDetails } from "../actions/authAction"
import {connect} from 'react-redux';
import { useForm } from "react-hook-form";
import { arrowBack } from 'ionicons/icons';
import http from '../services/httpCall';
import apis from '../services/apis';


//++++++++++++++add addres++++++++++++++++++
function AddressForm(props:any) {
    const {register,handleSubmit,watch,errors,setValue,reset,} = useForm({mode: "onSubmit",reValidateMode: "onChange"});

    const onSubmit = (data:any)=>{
        let dataToSend = {...data};
        console.log(data);
        props.loading(true);
        let url = props.modalMode==='edit'?apis.EDIT_ADDRESS:apis.ADD_ADDRESS;
        dataToSend.address_id = props.modalMode==='edit'?props.data._id:undefined;
        http.post(url,data).then((result)=>{
            console.log(result.data);
            props.openToast(result.data.message);
            
            http.get(apis.GET_USER_DETAILS).then((result)=>{
                console.log(result);
                if(result.data.status){
                    props.setUserDetails(result.data.data);
                }
                else{
                    props.logout();
                }
            }).catch((err)=>{
                console.log(err);
            })

            if(result.data.status){
                props.closeModal();
            }
        }).catch((err)=>{
            console.log(err);
            props.openToast("server error");
        }).finally(()=>{
            props.loading(false);
        })
    }


    return (
        <IonModal 
            isOpen={props.isModalShowing}
            cssClass='add-address-modal'
        >
            <IonContent>
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={props.closeModal}>
                                <IonIcon slot="icon-only" icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Add Address</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="address-add-form">
                    <IonItem className={"address-form-input" + (errors.lineone?" input-validation-error":"") }>
                        <IonInput 
                            placeholder="Address line 1" 
                            type="text"
                            name="lineone"
                            ref={register({
                                required: true
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonItem className={"address-form-input" + (errors.locality?" input-validation-error":"") }>
                        <IonInput 
                            placeholder="Locality" 
                            type="text"
                            name="locality"
                            ref={register({
                                required: true
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonItem className={"address-form-input" + (errors.city?" input-validation-error":"") }>
                        <IonInput 
                            placeholder="City" 
                            type="text"
                            name="city"
                            ref={register({
                                required: true
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonItem className={"address-form-input" + (errors.district?" input-validation-error":"") }>
                        <IonInput 
                            placeholder="District" 
                            type="text"
                            name="district"
                            ref={register({
                                required: true
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonItem className={"address-form-input" + (errors.state?" input-validation-error":"") }>
                        <IonInput 
                            placeholder="Stater" 
                            type="text"
                            name="state"
                            ref={register({
                                required: true
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonItem className={"address-form-input" + (errors.country?" input-validation-error":"") }>
                        <IonInput 
                            placeholder="Country" 
                            type="text"
                            name="country"
                            ref={register({
                                required: true
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonItem className={"address-form-input" + (errors.pincode?" input-validation-error":"") }>
                        <IonInput 
                            placeholder="Pin code" 
                            type="text"
                            name="pincode"
                            ref={register({
                                required: true,
                                minLength:6,
                                maxLength:6
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonButton expand="full" type="submit" className="add-address-button">Add Address</IonButton>
                </form>
            </IonContent>
        </IonModal>
    )
}


const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, { 
    loading,
    openToast,
    setUserDetails
})(AddressForm);