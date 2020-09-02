import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from 'react-loading-skeleton';
import product1 from "../static/images/product1.jpg";
import http from '../../services/httpCall';
import apis from '../../services/apis';
import {modal} from "../../actions/modalAction";
import {cartQuantity} from "../../actions/cartAction";
import { Editor, EditorState, convertFromRaw } from "draft-js";


function SingleProductComponent(props) {
    let [product, setProduct] = useState({});
    const [productDescription,setProductDescription] = useState(() => EditorState.createEmpty());
    const [quantity,setQuantity] = useState(0);
    const [errorInCart,setErrorInCart] = useState("");

    let {id}=useParams();
    // console.log(id);
    const fetchProduct = ()=>{
        http.get(apis.GET_SINGLE_PRODUCT+`${id}`)
        .then((result)=>{
            console.log(result);
            if(result.data.status){
                setProduct(result.data.data);
                const contentState = convertFromRaw(JSON.parse(result.data.data.description));
                const editorState = EditorState.createWithContent(contentState);
                setProductDescription(editorState);

            }else{
                console.log(result.data.message);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleAddToCart = ()=>{
        if(!props.Auth.isLoggedIn){
            // console.log(props.modalLoading.loading);
            props.modal(true);
        }
        else{
            http.post(apis.ADD_TO_CART,{
                product_id:product._id
            }).then((result)=>{
                console.log(result);
                if(result.data.status){
                    props.cartQuantity(result.data.data.cart[0].count);
                }else{
                    // setErrorInCart(message);
                    console.log(result.data);
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    useEffect(()=>{
        fetchProduct();
    },[]);

    return (
        <div className="container">
            <ul className="breadcrumb">
                <li><Link to="/home"><i className="fa fa-home"></i></Link></li>
            </ul>
            <div id="column-left" className="col-sm-3 hidden-xs column-left">
                <div className="column-block">
                    <div className="column-block">
                    <div className="columnblock-title">Categories</div>
                        <div className="category_block">
                            <ul className="box-category treeview-list treeview">
                                {props.categories.category_list.length===0?
                                    <Skeleton count={5} />
                                :
                                    props.categories.category_list.map((data)=>(
                                        <li key={data._id}><Link to="#">{data.name}</Link></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content" className="col-sm-9">
                <div className="row">
                    <div className="col-sm-6">
                    <div className="thumbnails">
                            <div><Link className="thumbnail" to="/home" title="">{product.images ?<img src={product.images?`${apis.BASE_SERVER_URL}${product.images[0]}`:""} title= {product.name} alt="lorem ippsum dolor dummy" />:<Skeleton height={100}/>}</Link></div>
                        <div id="product-thumbnail">
                            <OwlCarousel
                            id="product-thumbnail"
                            className="owl-theme"
                            items="4"
                            autoplay
                            loop
                            dots
                            margin={3}
                            >
                                {(product.images && product.images.length>0) && product.images.map((image,index)=>(
                                    <div className="item" key={index}> <Link to="#"><img src={product.images?`${apis.BASE_SERVER_URL}${image}`:""} alt="product1" className="img-responsive" /></Link> </div>
                                ))}
                                <div className="item"> <Link to="#"><img src={product1} alt="product2" className="img-responsive" /></Link> </div>
                            </OwlCarousel>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-6">
                    <h1 className="productpage-title">{product.name || <Skeleton />}</h1>
                    <ul className="list-unstyled productinfo-details-top">
                        <li>
                            
                            <h2 className="productpage-price">Price: Rs.{product.salePrice?product.salePrice:product.regularPrice|| <Skeleton />}</h2>
                        </li>
                    </ul>
                    <hr />
                    <ul className="list-unstyled product_info">
                        {product.isActive?(
                        <li>
                        <label>Availability:</label>
                        <span> In Stock</span>
                        </li>) :<Skeleton />}
                        {product.isActive===false && (
                        <li>
                        <label>Availability:</label>
                        <span> In Stock</span>
                        </li>)}
                    </ul>
                    <hr />
                    {/* <p className="product-desc"> */}
                        <Editor editorState={productDescription} readOnly={true} />
                    
                    <div id="product">
                        <div className="form-group">
                            <div className="btn-group">
                                <button type="button" id="button-cart" onClick={handleAddToCart} className="btn btn-primary btn-lg btn-block addtocart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="productinfo-tab">
                    <ul className="nav nav-tabs">
                    <li className="active"><Link href="#tab-description" data-toggle="tab">Description</Link></li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="tab-description">
                            <div className="cpt_product_description ">
                                <div>
                                <Editor editorState={productDescription} readOnly={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps= (state) => ({
    categories: state.FetchCategories,
    Auth: state.Auth,
    modalLoading: state.Modal
})

export default connect(mapStateToProps, {
    modal,
    cartQuantity,
})(SingleProductComponent);
