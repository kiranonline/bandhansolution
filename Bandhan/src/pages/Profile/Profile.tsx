import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons,IonButton, IonBackButton } from '@ionic/react';
import React from 'react';
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import ProfilePageImage from "../../components/ProfilePageImage";
import UserDetailsCard from "../../components/UserDetailsCard";
import AddressList from "../../components/AddressList";
import './Profile.css';




const Profile: React.FC = (props: any) => {

    const Logout = ()=>{
        props.logout()
    }
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonButtons slot="start">
                        <IonBackButton icon="arrow-back-outline" text="go back"/>
                    </IonButtons>
                    <IonTitle className="custom-heading-text">Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <ProfilePageImage data={props.Auth.userdetails} />
                <h3 className="profilePage-user-name">{props.Auth.userdetails?props.Auth.userdetails.name:""}</h3>
                <UserDetailsCard data={props.Auth.userdetails} />
                <AddressList />
                <IonButton onClick={Logout} expand="full" className="log-out-button">
                    Log out
                </IonButton>
            </IonContent>
        </IonPage>
    )
}




const mapStateToProps = (state: any) => ({
    Auth: state.Auth
})
export default connect(mapStateToProps, {
    logout
})(Profile);

