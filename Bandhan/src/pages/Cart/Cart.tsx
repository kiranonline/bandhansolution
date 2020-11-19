import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { useIonViewWillEnter } from "@ionic/react";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import { openToast, loading } from "../../actions/loadingAction";
import CartItem from "../../components/CartItem"
import apis from '../../services/apis';
import http from '../../services/httpCall';
import './Cart.css';
import { useHistory } from 'react-router-dom';

const Cart: React.FC = (props: any) => {
    const [cartItems,setcartItems]:[any,any] = useState([undefined,undefined,undefined,undefined,undefined]);
    const [cartCounts,setCartCounts]:[any,any] = useState([0,0,0,0])
    const [cartId,setCartId]:[any,any]=useState();
    const history = useHistory();

    const fetchCartData = ()=>{
        props.loading(true)
        http.get(apis.FETCH_THE_CART).then(result=>{
            console.log(result.data)
            if(result.data.status){
                setcartItems(result.data.data.product_details);
                setCartCounts(result.data.data.cart);
                setCartId(result.data.data._id)
            }
            else{
                props.openToast(result.data.message)
                setcartItems([])
            }
        }).catch(err=>{
            console.log(err)
            props.openToast("something went wrong")
        }).finally(()=>{
            props.loading(false)
        })
    }


    useIonViewWillEnter(() => {
        setcartItems([undefined,undefined,undefined,undefined,undefined])
        fetchCartData()
    });

    const updateQty = (id:any, amount:number) => {
        let x = cartCounts.map((item:any) => {
            if (item._id !== id) return item;
            return {...item, count: item.count + amount}    
        })
        console.log(x);
        syncCart(x)
    }


    const deleteItem = async(productID:any) => {
        let x = cartCounts.filter((item:any)=>{
            return item._id!==productID
        })
        console.log(x);
        syncCart(x)
    }



    const syncCart = (data:any)=>{
        let body = {
            _id: cartId,
            cart: data
        }
        props.loading(true)
        http.post(apis.UPDATE_CART,body).then(result=>{
            console.log(result.data)
        }).catch(err=>{
            console.log(err)
            props.openToast("something went wrong")
        }).finally(()=>{
            props.loading(false);
            fetchCartData()
        })
    }

    const goToCheckout = ()=>{
        history.push("/secure/checkout")
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonTitle className="custom-heading-text">Cart</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {cartItems.length===0?
                    <div style={{width:"100%",textAlign:"center"}}>
                        <h1>Your cart is empty!</h1>
                        <h4>How about some shopping</h4>
                    </div>
                    :
                    <div >
                        {cartItems.map((ele:any,i:any)=>(
                            <CartItem deleteItem={deleteItem} updateQty={updateQty} key={i} data={ele} cart={cartCounts.find((e:any)=>e.product==ele?._id)}/>
                        ))}
                        {cartItems.length>0 && cartItems[0] && <IonButton onClick={goToCheckout} className="checkout-button" expand="full">CHECKOUT</IonButton> }
                        
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
})(Cart);
