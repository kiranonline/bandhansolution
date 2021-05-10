import React,{ useState, useEffect } from 'react';
import {IonCard, IonSpinner, IonInput, IonHeader, IonItem,IonIcon, IonToolbar, IonButtons, IonButton, IonContent, IonTitle } from '@ionic/react';
import AddressCard from "./AddressCard";
import AddreeFrom from "./AddressFrom";
import { useForm } from "react-hook-form";
import { arrowBack } from 'ionicons/icons';
import http from '../services/httpCall';
import apis from "../services/apis";
import { useTranslation } from 'react-i18next';

export default function AddressList() {
    const [isModalShowing, setIsModalShowing] = useState(false);
    const [isAddressFetching,setIsAddressFetching] = useState(false);
    const [modalMode,setModalMode] = useState("create");
    const [editAddressData,setEditAddressData] = useState({});
    const [addresses,setAddresses] = useState([]);
    const { t } = useTranslation()


    const openModal = ()=> setIsModalShowing(true);
    const closeModal = ()=> {
        setIsModalShowing(false);
        fetchAddresses();
    }

    const editAddress = (data:any)=>{
        setModalMode("edit");
        setEditAddressData(data)
        openModal()
    }

    const createNew = ()=>{
        setModalMode("create");
        setEditAddressData({})
        openModal()
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
                        <h6>{t('addresspage.noAddress')}</h6>
                    </div>
                    :
                    addresses.map((ele:any,i:any)=> <AddressCard editAddress={editAddress} fetchAddresses={fetchAddresses} data={ele} key={i} hasDeleteKey={addresses.length>1}/>)
                }
                <IonButton onClick={createNew} expand="full" className="add-address-button">
                    {t('addAddress.headertext')}
                </IonButton>
                <AddreeFrom data={editAddressData} modalMode={modalMode} closeModal={closeModal} isModalShowing={isModalShowing}/>
            </IonCard>
        </div>
    )
}














