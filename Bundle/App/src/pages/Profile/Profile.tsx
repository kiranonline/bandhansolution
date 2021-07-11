import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons,IonButton, IonBackButton, IonSelect, IonSelectOption, IonCard } from '@ionic/react';
import React from 'react';
import { connect } from "react-redux";
import { logout, changeLanguage } from "../../actions/authAction";
import ProfilePageImage from "../../components/ProfilePageImage";
import UserDetailsCard from "../../components/UserDetailsCard";
import AddressList from "../../components/AddressList";
import './Profile.css';
import { useTranslation } from 'react-i18next';



const Profile: React.FC = (props: any) => {
    const { t } = useTranslation();

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
                    <IonTitle className="custom-heading-text">{t('profilePage.headertext')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <ProfilePageImage data={props.Auth.userdetails} />
                <h3 className="profilePage-user-name">{props.Auth.userdetails?props.Auth.userdetails.name:""}</h3>
                <UserDetailsCard data={props.Auth.userdetails} />
                <AddressList />
                <IonCard className="profilePage-user-address-card">
                    <IonSelect value={props.Language.selectedlanguage} onIonChange={(e)=>{
                        console.log(e.detail.value);
                        props.changeLanguage(e.detail.value)
                    }}>
                        <IonSelectOption value="en">English</IonSelectOption>
                        <IonSelectOption value="hi">Hindi</IonSelectOption>
                        <IonSelectOption value="bn">Bengali</IonSelectOption>
                    </IonSelect>
                </IonCard>

                <IonButton onClick={Logout} expand="full" className="log-out-button">
                    {t('profilePage.logoutButtonText')}
                </IonButton>
            </IonContent>
        </IonPage>
    )
}




const mapStateToProps = (state: any) => ({
    Auth: state.Auth,
    Language:state.Language
})
export default connect(mapStateToProps, {
    logout,
    changeLanguage
})(Profile);

