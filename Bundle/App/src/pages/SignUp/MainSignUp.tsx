import React from "react";
import { IonInput, IonItem, IonButton} from '@ionic/react';
import {connect} from 'react-redux';
import { useForm } from "react-hook-form";
import {loading,openToast} from "../../actions/loadingAction";
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { useTranslation } from 'react-i18next';

const MainSignUp = (props:any)=>{
    const {register,handleSubmit,watch,errors,setValue,reset,} = useForm({mode: "onSubmit",reValidateMode: "onChange"});
    const { t } = useTranslation();



    const onSubmit = (data:any)=>{
        console.log(data);
        props.loading(true);
        http.post(apis.REGISTER,{
            ...data
        }).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                props.loading(false);
                props.changeFromState(2,result.data.data)
            }
            else{
                props.openToast(result.data.message);
                props.loading(false);
            }
        }).catch((err)=>{
            props.openToast("server error");
            props.loading(false);
        })
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <IonItem className={"signup-input" + (errors.name?" input-validation-error":"") }>
                <IonInput
                    placeholder={t('SignUpPage.SignUpMainForm.nameField')}
                    type="text"
                    name="name"
                    ref={register({
                      required: true
                    })}
                ></IonInput>
            </IonItem>
            <IonItem className={"signup-input" + (errors.phoneNumber?" input-validation-error":"") }>
                <IonInput
                    placeholder={t('SignUpPage.SignUpMainForm.phoneField')}
                    type="number"
                    name="phoneNumber"
                    ref={register({
                      required: true,
                      minLength:10,
                      maxLength:10
                    })}
                ></IonInput>
            </IonItem>
            <IonItem className={"signup-input" + (errors.email?" input-validation-error":"") }>
                <IonInput
                    placeholder={t('SignUpPage.SignUpMainForm.emailField')}
                    type="email"
                    name="email"
                    ref={register}
                ></IonInput>
            </IonItem>
            <IonItem className={"signup-input" + (errors.password?" input-validation-error":"") }>
                <IonInput
                    placeholder={t('SignUpPage.SignUpMainForm.passwordField')}
                    type="password"
                    name="password"
                    ref={register({
                        required:true
                    })}
                ></IonInput>
            </IonItem>
            <IonButton expand="full" type="submit" className="signup-button normal">{t('SignUpPage.SignUpMainForm.submitButton')}</IonButton>
        </form>
    )
}


const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, {
    loading,
    openToast
})(MainSignUp);