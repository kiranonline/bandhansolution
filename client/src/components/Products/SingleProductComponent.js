import React, { useState, useEffect } from 'react';
import {useParams, useHistory} from "react-router-dom";
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
    const [productImage,setproductImage] = useState("");
    const [categorySelected, setCategory] = useState("");
    const [errorInCart,setErrorInCart] = useState("");
    let history = useHistory();

    let {id}=useParams();
    // console.log(id);

    const fetchProduct = ()=>{
        http.get(apis.GET_SINGLE_PRODUCT+`${id}`)
        .then((result)=>{
            console.log(result);
            if(result.data.status){
                setProduct(result.data.data);
                setproductImage(result.data.data.images[0]);
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

    const handleCategory = ()=>{
        
    }

    useEffect(()=>{
        fetchProduct();
    },[]);

    return (
        <div className="container">
            <ul className="breadcrumb">
                <li>
                    <Link to="/">
                        <i className="fa fa-home"></i>
                        <span className="ml-1">Home</span>
                    </Link>
                </li>
            </ul>

            <div className="row">
                <div id="column-left" className="col-12 col-md-3 hidden-xs column-left">
                <div className="column-block">
                    <div className="column-block">
                    <div className="columnblock-title">Categories</div>
                        <div className="category_block">
                            <ul className="box-category treeview-list treeview">
                                {props.categories.category_list.length===0?
                                    <Skeleton count={7} />
                                :
                                    props.categories.category_list.map((data)=>(
                                        <div onClick={()=>handleCategory()}>
                                        <li key={data._id} >
                                        <Link to="#">
                                            {data.name}
                                        </Link>
                                        </li>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

                <div id="content" className="col-md-9 col-12">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="thumbnails">
                                <div className="mb-2">
                                    <Link className="thumbnail" to="#">        
                                        {productImage ? <img src={productImage ? `${apis.BASE_SERVER_URL}${productImage}`: "/blog/blog_1.png"} style={{height: "300px"}} className=" d-block mx-auto" title= {product.name} alt="lorem ippsum dolor dummy" />:<Skeleton height={100}/>}
                                    </Link>
                                </div>
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
                                            <div className="item" key={index} onClick={()=>setproductImage(image)}> <img src={product.images?`${apis.BASE_SERVER_URL}${image}`: product1} alt="product1" className="img-responsive" /> </div>
                                        ))}
                                        {/* <div className="item"> <Link to="#"><img src={product1} alt="product2" className="img-responsive" /></Link> </div> */}
                                    </OwlCarousel>
                                </div>
                        </div>
                        </div>
                        <div className="col-sm-6 d-flex flex-column justify-content-center">
                        <h1 className="productpage-title h1 mb-2">{product.name || <Skeleton />}</h1>
                        <ul className="list-unstyled productinfo-details-top ml-1">
                            <li>
                                
                                <h2 className="productpage-price">Price:&nbsp;
                                {product.salePrice ? (
                                    <>
                                    <span className='strikethrough text-danger'>Rs.{product.regularPrice}</span>&nbsp;
                                    <span className="h4">Rs.{product.salePrice}</span>
                                    </>
                                ) :product.regularPrice
                                || <Skeleton />
                                }
                                </h2>
                            </li>
                        </ul>
                        <hr className="my-2"/>
                        <ul className="list-unstyled product_info m-0 ml-1">
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
                        <hr className="my-2"/>
                        {/* <p className="product-desc"> */}
                            {/* <Editor editorState={productDescription} readOnly={true} /> */}
                        
                        <div id="product" className="mt-2 ml-1">
                            <div className="form-group">
                                
                                <button type="button" id="button-cart" onClick={handleAddToCart} className="btn btn-primary btn-lg btn-block addtocart m-0 px-4 py-2 w-75"
                                style={{fontSize: "1rem"}}
                                >
                                    Add to Cart
                                </button>
                                
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="productinfo-tab">
                        <ul className="nav nav-tabs">
                        <li className="active h4"><Link href="#tab-description" data-toggle="tab">Description</Link></li>
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
