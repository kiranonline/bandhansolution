import React from "react";
import { IonContent, IonFab, IonFabButton, IonPage, IonInput, IonItem, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import "./Login.css";
import {connect} from 'react-redux';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { useForm } from "react-hook-form";
import { personAddOutline,homeOutline } from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import {loading,openToast} from "../../actions/loadingAction";
import {login} from "../../actions/authAction";
import { useTranslation } from 'react-i18next';
const { Storage } = Plugins;


const Login = (props:any)=>{
    const {register,handleSubmit,watch,errors,setValue,reset,} = useForm({mode: "onSubmit",reValidateMode: "onChange"});
    const { t } = useTranslation();


    console.log("3")

    const onSubmit = (data:any)=>{
        console.log(data);
        props.loading(true);
        http.post(apis.LOGIN_WITH_EMAIL_OR_PHONE,{
            ...data
        }).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                Storage.set({
                    key: 'Token',
                    value: result.data.token
                });
                props.loading(false);
                props.login(result.data.token,result.data.data);
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
        <IonPage>
            <IonContent fullscreen={true} className="login-page-wrapper ion-padding">
                <IonFab vertical="top" horizontal="end" slot="fixed">
                    <IonFabButton className="custom-back" routerLink="/signup">
                        <IonIcon icon={personAddOutline} />
                    </IonFabButton>
                </IonFab>
                {/* <h3 className="signup-text">Welcome to</h3>               */}
                <img className="brand-logo" src={require("../../static/brand-logo-actual.png")} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonItem className={"signup-input" + (errors.phoneNumber?" input-validation-error":"") }>
                        <IonInput
                            placeholder={t('LoginPage.LoginForm.phoneField')}
                            type="number"
                            name="phoneNumber"
                            ref={register({
                                required: true,
                                minLength:10,
                                maxLength:10
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonItem className={"signup-input" + (errors.password?" input-validation-error":"") }>
                        <IonInput
                            placeholder={t('LoginPage.LoginForm.passwordField')}
                            type="password"
                            name="password"
                            ref={register({
                                required:true
                            })}
                        ></IonInput>
                    </IonItem>
                    <IonButton expand="full" type="submit" className="login-button normal">{t('LoginPage.LoginForm.loginButton')}</IonButton>
                </form>
                {/* <IonButton expand="full" className="login-button google">
                    Login with google
                </IonButton>
                <IonButton expand="full" className="login-button facebook">
                    Login with Facebook
                </IonButton> */}
            </IonContent>
        </IonPage>
    )
}

const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, {
    loading,
    openToast,
    login
})(Login);