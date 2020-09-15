import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonMenuButton,IonButtons } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import './Product.css';
import http from '../../services/httpCall';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import apis from "../../services/apis";
import { openToast, loading } from "../../actions/loadingAction";
import ProductImageSlide from "./ProductImageSlide"


const Product: React.FC = (props: any) => {
    const [productDescription,setProductDescription] = useState(() => EditorState.createEmpty());
    const [product,setProduct]:[any,any] = useState()
    const { id }:any = useParams();
    

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

    useEffect(()=>{
        fetchProductDetails()
    },[])



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
                {product?
                    <div>
                        <ProductImageSlide images={product.images}/>
                        <div className="product-description-wrapper">
                            <h6 className="product-description-product-name">
                                {product.name}
                            </h6>
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
