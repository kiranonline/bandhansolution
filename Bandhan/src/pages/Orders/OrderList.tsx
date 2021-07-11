import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { useIonViewWillEnter } from "@ionic/react";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import { openToast, loading } from "../../actions/loadingAction";
import CartItem from "../../components/CartItem"
import apis from '../../services/apis';
import http from '../../services/httpCall';
import './OrderList.css';
import { useHistory } from 'react-router-dom';
import OrderCard from "./OrderCard"
import { useTranslation } from 'react-i18next';


const OrderList: React.FC = (props: any) => {
    const [orderData,setOrderData]:[any,any] = useState([undefined,undefined,undefined,undefined,undefined,undefined]);
    const history = useHistory();
    const { t } = useTranslation();


    const fetchOrderItems = ()=>{
        props.loading(true)
        http.get(apis.GET_ORDERS)
        .then(res => {
            console.log("ORDERS", res.data);
            if(res.data.status){
                setOrderData(res.data.data)
            }
            else{
                props.openToast(res.data.message)
            }
        })
        .catch((err)=>{
            console.log(err);
            props.openToast("server error")
        })
        .finally(()=>{
            props.loading(false)
        })
    }


    useIonViewWillEnter(() => {
        setOrderData([undefined,undefined,undefined,undefined,undefined,undefined])
        fetchOrderItems()
    });


    const vieworder = (id:any)=>{
        history.push(`/secure/order-details/${id}`)
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonTitle className="custom-heading-text">
                        {t('orderListPage.pageHeader')}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {orderData.map((ele:any,i:any)=>(
                    <OrderCard data={ele} key={i} vieworder={vieworder}/>
                ))}
                {orderData && Array.isArray(orderData) && orderData.length===0
                    &&
                    <div style={{width:"100%",textAlign:"center"}}>
                        <h1>
                            {t('orderListPage.empthOrderList')}
                        </h1>
                        <h4>
                            {t('orderListPage.shopping')}
                        </h4>
                    </div>
                }
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
    loading
})(OrderList);
