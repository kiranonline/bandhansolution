import React from 'react';
import { IonCard,IonSkeletonText,IonCardContent,IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { trashBin, toggleOutline, pencilOutline } from 'ionicons/icons';
import {connect} from 'react-redux';
import {loading,openToast} from "../actions/loadingAction";
import apis from "../services/apis";
import http from "../services/httpCall"



function AddressCard(props:any) {

    const delteAddress = ()=>{
        props.loading(true)
        http.post(apis.REMOVE_ADDRESS, {address_id: props.data._id})
        .then(res => {
            console.log(res.data);
            if(res.data.status === true){
                props.fetchAddresses()
            }
            else{
                props.openToast(res.data.message)
            }
        })
        .catch(err => {
            console.log(err);
            props.openToast("server error")
        }).finally(()=>{
            props.loading(false)
        })
    }

    const setDefaultAddress = () => {
        props.loading(true)
        http.post(apis.SET_DEFAULT_ADDRESS, {address_id: props.data._id})
        .then(res => {
            console.log(res.data);
            if(res.data.status === true){
                props.fetchAddresses()
            }
            else{
                props.openToast(res.data.message)
            }
        })
        .catch(err => {
            console.log(err);
            props.openToast("server error")
        }).finally(()=>{
            props.loading(false)
        })
        
    }



    const editAddress = ()=>{
        props.editAddress(props.data)
    }


    return (
        <div className={"address-card" + (props.data.isdefault?" default-address":"") } >
            {/* <IonGrid>
                <IonRow>
                    <IonCol size="9">
                        <h6>
                            {`
                                ${props.data.lineone}, 
                                ${props.data.locality}
                            `}
                        </h6>
                        <h6>{`${props.data.city}, ${props.data.district}`}</h6>
                        <h6>{`${props.data.state}, ${props.data.country}, ${props.data.pincode}`}</h6>
                    </IonCol>
                    <IonCol size="3" className="ion-align-self-center">
                        <IonIcon className="edit-address-button" icon={pencilOutline}  onClick={editAddress}/>
                        {props.hasDeleteKey && !props.data.isdefault && 
                            <IonIcon className="address-delte-button" icon={trashBin}  onClick={delteAddress}/>
                        }
                        {!props.data.isdefault && 
                            <IonIcon className="set-address-default-buttonn" icon={toggleOutline} onClick={setDefaultAddress} />
                        }
                    </IonCol>
                </IonRow>
            </IonGrid> */}
            <h6>
                {`
                    ${props.data.lineone}, 
                    ${props.data.locality}
                `}
            </h6>
            <h6>{`${props.data.city}, ${props.data.district}`}</h6>
            <h6>{`${props.data.state}, ${props.data.country}, ${props.data.pincode}`}</h6>
            <div className="address-control-section">
                <IonIcon className="edit-address-button" icon={pencilOutline}  onClick={editAddress}/>
                {props.hasDeleteKey && !props.data.isdefault && 
                    <IonIcon className="address-delte-button" icon={trashBin}  onClick={delteAddress}/>
                }
                {!props.data.isdefault && 
                    <IonIcon className="set-address-default-buttonn" icon={toggleOutline} onClick={setDefaultAddress} />
                }
            </div>
            
        </div>
    )
}



const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, { 
    loading,
    openToast
})(AddressCard);