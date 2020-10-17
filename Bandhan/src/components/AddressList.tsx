import React,{ useState, useEffect } from 'react';
import {IonCard, IonSpinner, IonInput, IonHeader, IonItem,IonIcon, IonToolbar, IonButtons, IonButton, IonContent, IonTitle } from '@ionic/react';
import AddressCard from "./AddressCard";
import AddreeFrom from "./AddressFrom";
import { useForm } from "react-hook-form";
import { arrowBack } from 'ionicons/icons';
import http from '../services/httpCall';
import apis from "../services/apis";


export default function AddressList() {
    const [isModalShowing, setIsModalShowing] = useState(false);
    const [isAddressFetching,setIsAddressFetching] = useState(false);
    const [modalMode,setModalMode] = useState("create");
    const [editAddressData,setEditAddressData] = useState();
    const [addresses,setAddresses] = useState([]);

    const openModal = ()=> setIsModalShowing(true);
    const closeModal = ()=> { 
        setIsModalShowing(false);
        fetchAddresses();
    }


    const fetchAddresses = ()=>{
        setIsAddressFetching(true)
        http.get(apis.GET_ADDRESSES).then((result)=>{
            console.log(result.data);
            if(result.data.status){
                setAddresses(result.data.data)
            }
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            setIsAddressFetching(false)
        })
    }

    useEffect(() => {
        fetchAddresses()
    }, [])


    return (
        <div>
            <IonCard className="profilePage-user-address-card">
                {isAddressFetching?
                    <div className="address-card-loader">
                        <IonSpinner name="lines" />
                    </div>
                    :
                    null
                }
                {(isAddressFetching===false && addresses.length===0)?
                    <div className="address-card-loader">
                        <h6>You don't have any address</h6>
                    </div>
                    :
                    addresses.map((ele:any,i:any)=> <AddressCard data={ele} key={i} />)
                }





                <IonButton onClick={openModal} expand="full" className="add-address-button">
                    ADD ADDRESS
                </IonButton>
                <AddreeFrom data={editAddressData} modalMode={modalMode} closeModal={closeModal} isModalShowing={isModalShowing}/>             
            </IonCard>
        </div>
    )
}














