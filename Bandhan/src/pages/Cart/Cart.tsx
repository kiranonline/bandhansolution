import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import './Cart.css';

const Cart: React.FC = (props: any) => {
    console.log("2")
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonTitle className="custom-heading-text">Cart</IonTitle>
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
})(Cart);
