import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonIcon,IonButtons, IonButton } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import './Product.css';
import http from '../../services/httpCall';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import apis from "../../services/apis";
import { openToast, loading } from "../../actions/loadingAction";
import ProductImageSlide from "./ProductImageSlide";
import { starOutline, star, cartOutline, arrowBack } from 'ionicons/icons';
import { useIonViewWillEnter } from "@ionic/react";



const Product: React.FC = (props: any) => {
    const [productDescription,setProductDescription] = useState(() => EditorState.createEmpty());
    const [product,setProduct]:[any,any] = useState()
    const { id }:any = useParams();
    const history = useHistory();
    

    let fetchProductDetails = ()=>{
        props.loading(true)
        http.get(apis.GET_SINGLE_PRODUCT+`/${id}`)
        .then((result)=>{
            console.log(result.data);
            if(result.data.status){
                setProduct(result.data.data);
                const contentState = convertFromRaw(JSON.parse(result.data.data.description));
                const editorState = EditorState.createWithContent(contentState);
                setProductDescription(editorState);
                
            }else{
                console.log(result.data.message);
                props.openToast(result.data.message)
            }
        })
        .catch((err)=>{
            console.log(err);
            props.openToast("something went wrong")
        }).finally(()=>{
            props.loading(false)
        })
    }


    useIonViewWillEnter(() => {
        fetchProductDetails()
    })




    const goBack = ()=>{
        history.goBack();
    }


    const addToCart=()=>{
        if(!props.Auth.isLoggedIn){
            props.openToast("You need to login first")
        }
        else if(!props.Auth.userdetails.defaultAddress){
            props.openToast("No default address set")
        }
        else{
            console.log("all set");
            props.loading(true);
            http.post(apis.ADD_TO_CART,{
                product_id:id
            }).then((result)=>{
                console.log(result.data);
                if(result.data.status){
                    props.openToast("Item added to cart")
                }else{
                    props.openToast(result.data.message)
                }
            }).catch((err)=>{
                console.log(err);
                props.openToast("server error")
            }).finally(()=>{
                props.loading(false);
            })
        }
    }



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonButtons slot="start">
                        <IonButton onClick={goBack} className="product-description-back-button">
                                <IonIcon slot="icon-only" icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                    <IonTitle className="custom-heading-text">Product</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {product?
                    <div>
                        <ProductImageSlide images={product.images}/>
                        <div className="product-description-wrapper">

                            <h6 className="product-description-product-name">
                                {product.name}
                            </h6>
                            <div className="product-description-tag-container">
                                {product.category.map((ele:any,i:any)=>
                                    <span key={i} className="product-description-product-tag">
                                        {ele.name}
                                    </span>
                                )}
                            </div>
                            
                            <div className="product-description-price-container">
                                {product.salePrice?
                                    <>
                                        <span className="price-striked-wrapper">
                                            <span className="price-striked-inner sz-bg"><span>&#8377;</span>{product.regularPrice}</span>
                                        </span>
                                        <span className="price-striked-inner actual-price sz-bg"><span>&nbsp;&#8377;</span>{product.salePrice}</span>
                                    </>
                                    :
                                    <span className="price-striked-inner actual-price sz-bg"><span>&nbsp;&#8377;</span>{product.regularPrice}</span>
                                }
                            </div>  

                            <div className="product-description-add-to-cart">
                                <IonButton expand="full" className="add-to-cart-button" onClick={addToCart}>
                                    ADD TO CART
                                    <IonIcon slot="end" icon={cartOutline} />
                                </IonButton>
                            </div>



                            {/* <div className="product-description-star-container">
                                <div className="">
                                    <IonIcon icon={star} className="item-star"/>
                                    <IonIcon icon={star} className="item-star" />
                                    <IonIcon icon={star} className="item-star" />
                                    <IonIcon icon={starOutline} className="item-star" />
                                    <IonIcon icon={starOutline} className="item-star" />
                                </div>

                                
                            </div> */}
                            <Editor editorState={productDescription} readOnly={true} onChange={()=>null} />
                        </div>
                        
                    </div>
                    :
                    null
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
})(Product);
