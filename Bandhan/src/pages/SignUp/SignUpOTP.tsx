import React,{useState,useEffect} from "react";
import { IonInput, IonItem, IonButton, IonGrid, IonRow, IonCol} from '@ionic/react';
import {connect} from 'react-redux';
import { useForm } from "react-hook-form";
import {loading,openToast} from "../../actions/loadingAction";
import {login} from "../../actions/authAction";
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { Plugins } from '@capacitor/core';
import {useHistory} from "react-router-dom"
const { Storage } = Plugins;



const SignUpOTP = (props:any)=>{
    const {register,handleSubmit,watch,errors,setValue,reset,} = useForm({mode: "onSubmit",reValidateMode: "onChange"});
    const history = useHistory();


    const onSubmit = (data:any)=>{
        console.log(data);
        props.loading(true);
        http.post(apis.OTP_VERIFICATION,{
            otp : data.otp,
            user_id : props.userId
        }).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                Storage.set({
                    key: 'Token',
                    value: result.data.token
                });
                props.loading(false);
                props.login(result.data.token,result.data.data);
                history.push("/secure/home")
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
            <IonItem className={"signup-input" + (errors.otp?" input-validation-error":"") }>
                <IonInput type="number"
                    name="otp"
                    ref={register({
                        required: true,
                        minLength:6,
                        maxLength:6
                      })}
                ></IonInput>
            </IonItem>   
            <IonButton expand="full" type="submit" className="signup-button normal">Validate</IonButton>
        </form>
    )
}


const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, { 
    loading,
    openToast,
    login
})(SignUpOTP);