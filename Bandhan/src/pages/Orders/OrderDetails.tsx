import { IonContent, IonHeader, IonPage, IonTitle, IonLabel, IonToolbar,IonItem, IonGrid, IonIcon,IonButtons, IonButton, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { logout, setUserDetails } from "../../actions/authAction";
import './OrderList.css';
import http from '../../services/httpCall';
import apis from "../../services/apis";
import { openToast, loading } from "../../actions/loadingAction";
import { arrowBack } from 'ionicons/icons';
import { useIonViewWillEnter } from "@ionic/react";
import OrderProduct from "./OrderDetailsProduct"





const OrderDetails: React.FC = (props: any) => {
    const [orderDetails, setOrderDetails]:[any,any] = useState();
    const {id}:any = useParams();
    const history = useHistory();

    const goBack = ()=>{
        history.goBack();
    }


    const fetchOrderDetails = ()=>{
        setOrderDetails()
        console.log(id);
        props.loading(true)
        http.get(`${apis.ORDER_DETAILS}/${id}`).then((result)=>{
            console.log(result.data)
            
            if(result.data.status){
                setOrderDetails(result.data.data);
            }
            else{
                alert(result.data.message)
            }
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            props.loading(false)
        })
    }

    useIonViewWillEnter(()=>{
        fetchOrderDetails();
    })
 

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonButtons slot="start">
                        <IonButton onClick={goBack} className="search-page-back-button">
                                <IonIcon slot="icon-only" icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                    <IonTitle className="custom-heading-text">Order : {id}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {orderDetails && orderDetails.address && 
                    <div className="order-details-address" >
                        <h5>Deliver to</h5>
                        <h6>
                            {`
                                ${orderDetails.address.lineone}, 
                                ${orderDetails.address.locality}
                            `}
                        </h6>
                        <h6>{`${orderDetails.address.city}, ${orderDetails.address.district}`}</h6>
                        <h6>{`${orderDetails.address.state}, ${orderDetails.address.country}, ${orderDetails.address.pincode}`}</h6>
                    </div>
                }
                {orderDetails && Array.isArray(orderDetails.items) && orderDetails.items.map((ele:any,i:any)=>(<OrderProduct key={i} data={ele}/>))}
            </IonContent>
        </IonPage>
    );
};




const mapStateToProps = (state: any) => ({
    Auth: state.Auth
})
export default connect(mapStateToProps, {
    logout,
    openToast,
    setUserDetails,
    loading
})(OrderDetails);
