import React, { useState, useRef } from 'react';
import { IonAvatar, IonIcon, IonItem, IonLabel, IonContent } from '@ionic/react';
import StandardImage from "../static/standard2.jpg";
import apis from "../services/apis";
import http from "../services/httpCall"
import { personCircleOutline, cameraReverseOutline } from 'ionicons/icons';
import {connect} from 'react-redux';
import {loading,openToast} from "../actions/loadingAction";
import { setUserDetails } from "../actions/authAction";




function ProfilePageImage(props:any) {
    const hiddenFileInput:any = useRef(null);

    const uploadAvatar = (event:any) => {
        props.loading(true)
        const newProfilPicture = event.target.files[0];
        const formData = new FormData();
        formData.append('avatar',newProfilPicture)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        http.post(apis.UPLOAD_USER_AVATAR, formData, config)
        .then(res => {
            console.log(res);
            if(res.data.status){
                props.loading(true)
                http.post(apis.USER_UPDATE_PROFILE_PIC, {avatar: res.data.file}).then(res => {
                    if(res.data.status){
                        props.openToast("profile picture updated")
                        getUserDetails();
                    }
                    else{
                        props.openToast("server error")
                    }
                }).catch(err => {
                    console.log(err);
                    props.openToast("server error")
                }).finally(()=>{
                    props.loading(false)
                })
            }
        })
        .catch(err => {
            console.log(err);
            props.openToast("server error")
        })
        .finally(() => {
            props.loading(false)
        })
    }




    const getUserDetails = () => {
        http.get(apis.GET_USER_DETAILS).then((result)=>{
            console.log(result.data.data);
            if(result.data.status){
                props.setUserDetails(result.data.data);
            }
            else{
                console.log("Error happened");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    const handleFileUploaderClick = ()=>{
        hiddenFileInput.current.click();
    }

    return (
        <>
            <div className="profilePage-bg-wrapper">
                <img src={StandardImage} />
                <div className="profilePage-bg-overlay"></div>
            </div>
            <div className="profilePage-avatar-wrapper">
                <IonAvatar className="profilePage-profile-avatar">
                    {(props.data && props.data.avatar)?
                        <img className="profilePage-profile-image" src={`${apis.BASE_SERVER_URL}${props.data.avatar}`} />
                        
                        :
                        <IonIcon className="profilePage-profile-image-not-present" icon={personCircleOutline} />
                    }
                    <input 
                        type="file"
                        style={{
                            display:"none"
                        }}
                        ref={hiddenFileInput}
                        onChange={uploadAvatar}
                    />
                    <IonIcon onClick={handleFileUploaderClick} className="change-profile-picture" icon={cameraReverseOutline} />
                </IonAvatar>
            </div>
            
        </>
    )
}



const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, { 
    loading,
    openToast,
    setUserDetails
})(ProfilePageImage);