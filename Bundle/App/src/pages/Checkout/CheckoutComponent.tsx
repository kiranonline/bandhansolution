import { IonContent, IonHeader, IonPage, IonTitle, IonLabel, IonToolbar,IonItem, IonGrid, IonIcon,IonButtons, IonButton, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { logout, setUserDetails } from "../../actions/authAction";
import './Checkout.css';
import http from '../../services/httpCall';
import apis from "../../services/apis";
import { openToast, loading } from "../../actions/loadingAction";
import { arrowBack } from 'ionicons/icons';
import { useIonViewWillEnter } from "@ionic/react";
import AddressSlider from "./AddressSlider";
import CheckoutItem from "./CheckoutItem"
import { useTranslation } from 'react-i18next';




const Checkout: React.FC = (props: any) => {
    const [defaultAddressId, setDefaultAddressId] = useState({});
    const [addresses, setAddresses]:[any,any] = useState([undefined,undefined,undefined]);
    const [cartDetails,setcartDetails]:[any,any] = useState([]);
    const [cart_id, setCartId] = useState("");
    const [products, setProducts]:[any,any] = useState([]);
    const [total, setTotal] = useState(0);
    const [statusList, setStatusList] = useState([]);
    const [orderPlaceable, isOrderPlaceable] = useState(false);
    const history = useHistory();
    const { t } = useTranslation()


    const goBack = ()=>{
        history.goBack();
    }


    const getUserAddresses = () => {
        props.loading(true)
        http.get(apis.GET_ADDRESS_LIST).then((result) => {
            console.log(result.data.data);
            if(result.data.status){
                result.data.data.forEach((address:any) => {
                    if(address.isdefault){
                        console.log(address._id)
                        setDefaultAddressId(address._id);
                    }
                })
                setAddresses(result.data.data)
            }
            else{
                console.log("Error Occoured", result.data.message)
                props.openToast(result.data.message);
            }
        }).catch(err => {
            console.log(err)
            props.openToast("server error");
        }).finally(()=>{
            props.loading(false)
        })
    }

    const fetchCart = ()=>{
        props.loading(true)
        http.get(apis.FETCH_THE_CART).then((result)=>{
            if(result.data.status){
                setCartId(result.data.data._id)
                setcartDetails(result.data.data.cart);
                console.log("cart++++++++++",result.data.data.cart,"\n product++++++++",result.data.data.product_details);
                setProducts(result.data.data.product_details);
                if(result.data.data.product_details.length===0){
                    history.goBack()
                }

            }else{
                console.log(result.data.message);
            }
        }).catch((err)=>{
            console.log(err);
            props.openToast("server error");
        }).finally(()=>{
            props.loading(false)
        })
    }

    useEffect(() => {
        let totalCost = 0;
        console.log("calculating total cost",cartDetails,products)
        if(cartDetails && Array.isArray(cartDetails) && cartDetails.length>0 && products && Array.isArray(products) && products.length>0){
            cartDetails.forEach((item:any, index:any) => {
                if(products && products[index]){
                    totalCost += products[index].salePrice ?  products[index].salePrice * item.count : products[index].regularPrice * item.count;
                }
            })
            console.log("totalCost",totalCost)
            setTotal(totalCost);
        }
    },[cartDetails, products])



    useEffect(() => {
        if(cartDetails && Array.isArray(cartDetails) && cartDetails.length>0){
            checkAvailibility()
        }
    }, [cartDetails])



    const checkAvailibility = () => {
        props.loading(true)
        var status:any = [];
        let flag = 0;
        console.log("cart details",products);
        let arr = cartDetails.map((e:any,i:any)=>http.post(apis.AVAILABLE_FOR_CART, {product_id: e.product,qty:e.count}))
        Promise.all(arr).then((res)=>{
            res.forEach((elel:any)=>{
                if(elel.data.status){
                    status.push(true)
                }
                else{
                    status.push(false)
                    flag = 1;
                }
            })
        }).catch((er)=>{

            console.log(er);
            status = arr.map((e:any)=>false)
        }).finally(() => {
            props.loading(false)
            setStatusList(status);
            if(flag === 1) isOrderPlaceable(false)
            else isOrderPlaceable(true)
        })
    }


    useIonViewWillEnter(()=>{
        getUserAddresses();
        fetchCart();
    })


    const changeDefaultAddress = (id:any) => {
        props.loading(true)
        http.post(apis.SET_DEFAULT_ADDRESS, {address_id: id})
        .then(res => {
            console.log(res.data);
            if(res.data.status === true){
                getUserAddresses();
                checkAvailibility();
                fetchUserDetails()
            }
            else{
                props.openToast(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            props.openToast("server error");
        }).finally(()=>{
            props.loading(false)
        })
    }

    let fetchUserDetails = ()=>{
        http.get(apis.GET_USER_DETAILS).then((result)=>{
          console.log(result);
          if(result.data.status){
              props.setUserDetails(result.data.data);
          }
          else{
              props.logout();
          }
        }).catch((err)=>{
          console.log(err);
          props.logout()
        })
      }

    const deleteItem = async(productID:any) => {
        let y = products.filter((e:any)=>e._id!==productID)
        let x = cartDetails.filter((e:any) => e.product !== productID);
        console.log(productID,x)

        updatecart(x,y) ;
    }

    const updatecart = (x:any,y:any) => {
        console.log("updating",x,y)
        props.loading(true)
        let data = {
            _id: cart_id,
            cart: cartDetails
        }
        if(x !== null){
            data = {
                ...data,
                cart: x
            }
        }
        http.post(apis.UPDATE_CART, data)
        .then(res => {
            if(res.data.status){
                console.log(res.data)
                setcartDetails(x);
                setProducts(y);
                if(x.length===0){
                    history.goBack()
                }

            }
            else{
                props.openToast(res.data.message);
            }
        })
        .catch(err => {
            console.log(err)
            props.openToast("server error");
        })
        .finally(() => props.loading(false))
    }



    const isAvailableLocal = (productId:any)=>{
        if(Array.isArray(cartDetails) && cartDetails.length>0){
            var index=0;
            for(index=0;index<cartDetails.length;index++){
                if(cartDetails[index] && cartDetails[index].product==productId){
                    console.log("ans",statusList[index])
                    return statusList[index]
                }
                else{
                    continue;
                }
            }
        }
        else{
            return false
        }

    }


    const placeOrder = () => {
        props.loading(true)
        http.post(apis.PLACE_ORDERS,)
        .then(res => {
            console.log(res.data)
            if(res.data.status){
                console.log(res.data);
                history.push('/secure/order-success')
            }
            else{
                props.openToast(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            props.openToast("order could not be placed");
        }).finally(()=>{
            props.loading(false)
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonButtons slot="start">
                        <IonButton onClick={goBack} className="search-page-back-button">
                                <IonIcon slot="icon-only" icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                    <IonTitle className="custom-heading-text">
                        {t('checkoutPage.checkoutText')}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <AddressSlider key={addresses} addresses={addresses} changeDefaultAddress={changeDefaultAddress}/>
                {products.map((ele:any,i:any)=>(
                    <CheckoutItem isOk={isAvailableLocal(ele._id)} deleteItem={deleteItem} key={i} data={ele} cart={cartDetails.find((e:any)=>e.product==ele?._id)}/>
                ))}
                <div className="order-summary">
                    <h5>{t('checkoutPage.totalText')} : {total}</h5>
                </div>
                <IonButton onClick={placeOrder} disabled={!orderPlaceable} expand="full" className="place-final-order">
                {t('checkoutPage.placeOrder')}
                </IonButton>
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
})(Checkout);
