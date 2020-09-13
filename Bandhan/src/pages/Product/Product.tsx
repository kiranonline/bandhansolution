import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonMenuButton,IonButtons } from '@ionic/react';
import React from 'react';
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import './Product.css';

const Product: React.FC = (props: any) => {
    console.log("2")
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle className="custom-heading-text">Product</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                
            </IonContent>
        </IonPage>
    );
};




const mapStateToProps = (state: any) => ({
  Auth: state.Auth
})
export default connect(mapStateToProps, {
  logout
})(Product);
