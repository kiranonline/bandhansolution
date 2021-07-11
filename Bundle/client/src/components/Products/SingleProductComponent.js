import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from 'react-loading-skeleton';
import product1 from "../static/images/product1.jpg";
import http from '../../services/httpCall';
import apis from '../../services/apis';
import { modal } from "../../actions/modalAction";
import { cartQuantity } from "../../actions/cartAction";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import CategorySelector from '../GlobalComponents/CategorySelector';


function SingleProductComponent(props) {
    let [product, setProduct] = useState({});
    let [productCategory, setProductCategory] = useState([]);
    const [productDescription, setProductDescription] = useState(() => EditorState.createEmpty());
    const [productImage, setproductImage] = useState("");

    const [isAvailable, setIsAvailable] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [succesfulAddition, setSuccessfulAddition] = useState(false);

    let { id } = useParams();
    // console.log(id);

    const fetchProduct = () => {
        console.log("fetching products+++++++++++")
        http.get(apis.GET_SINGLE_PRODUCT + `${id}`)
            .then((result) => {
                console.log("++++++++++++++++++++product details+++++++++++++++++++", result.data);
                if (result.data.status) {
                    setProduct(result.data.data);
                    setproductImage(result.data.data.images[0]);
                    const contentState = convertFromRaw(JSON.parse(result.data.data.description));
                    const editorState = EditorState.createWithContent(contentState);
                    setProductDescription(editorState);
                    setProductCategory(result.data.data.category);

                } else {
                    console.log(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleAddToCart = () => {
        if (!props.Auth.isLoggedIn) {
            // console.log(props.modalLoading.loading);
            props.modal(true);
        }
        else if (!props.Auth.userdetails.defaultAddress) {
            console.log("No default address set");
            setShowModal(true);
        }
        else {
            http.post(apis.ADD_TO_CART, {
                product_id: product._id
            }).then((result) => {
                console.log(result);
                if (result.data.status) {
                    props.cartQuantity(result.data.data.cart[0].count);
                    setSuccessfulAddition(true);
                    setTimeout(() => setSuccessfulAddition(false), 3000);
                } else {
                    // setErrorInCart(message);
                    setIsAvailable(false);
                    setShowModal(true);
                    console.log(result.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

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

                <CategorySelector />

                <div id="content" className="col-md-9 col-12">
                    {
                        showModal ?
                            (
                                <div className="alert alert-danger" role="alert">
                                    Sorry This product is not available for your default address. Change/set your default address at <Link to="/profile" className="text-primary font-weight-bold">Profile</Link> page to get the product.
                                </div>
                            )
                            :
                            (
                                <>
                                </>
                            )
                    }

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="thumbnails">
                                <div className="mb-2">
                                    <Link className="thumbnail" to="#">
                                        {productImage ? <img src={productImage ? `${apis.BASE_SERVER_URL}${productImage}` : "/blog/blog_1.png"} style={{ height: "300px" }} className=" d-block mx-auto" title={product.name} alt="lorem ippsum dolor dummy" /> : <Skeleton height={100} />}
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
                                        {(product.images && product.images.length > 0) && product.images.map((image, index) => (
                                            <div className="item" key={index} onClick={() => setproductImage(image)}> <img src={product.images ? `${apis.BASE_SERVER_URL}${image}` : product1} alt="product1" className="img-responsive" /> </div>
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
                                        ) : product.regularPrice
                                            || <Skeleton />
                                        }

                                    </h2>
                                    {product.properties ? (
                                        <>
                                            {product.properties.map((ele, i) => (
                                                <p key={i} style={{ margin: '0px' }}>{ele.value} {ele.type}</p>
                                            ))}
                                        </>

                                    ) : null
                                        || <Skeleton />
                                    }
                                </li>
                            </ul>
                            <hr className="my-2" />
                            <ul className="list-unstyled product_info m-0 ml-1">
                                {product.isActive ? (
                                    <li>
                                        <label>Availability:</label>
                                        <span> In Stock</span>
                                    </li>) : <Skeleton />}
                                {product.isActive === false && (
                                    <li>
                                        <label>Availability:</label>
                                        <span> In Stock</span>
                                    </li>)}
                            </ul>

                            <div className="categoryButton">
                                {productCategory.map((cat, i) =>
                                    <a className="mr-2" href={`/products/?category=${cat}`} key={i} style={{ textTransform: "capitalize" }}>

                                        <span className="badge badge-pill badge-warning p-2">
                                            {/* {props.categories && props.categories.category_list && props.categories.category_list.length > 0 ? props.categories.category_list.filter(e => e._id === cat)[0].name : ""} */}
                                            {cat.name}
                                        </span>
                                    </a>

                                )}
                            </div>

                            <hr className="my-2" />

                            <div id="product" className="mt-2 ml-1">
                                <div className="form-group">

                                    {
                                        succesfulAddition ?
                                            (
                                                <div className="alert alert-success w-75" role="alert">
                                                    Successfully added to the cart
                                                </div>
                                            )
                                            :
                                            ""
                                    }


                                    <button type="button" id="button-cart" onClick={handleAddToCart} className="btn btn-primary btn-lg btn-block addtocart m-0 px-4 py-2 w-75"
                                        style={{ fontSize: "1rem" }} disabled={!isAvailable}
                                    >
                                        Add to Cart
                                </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productinfo-tab">
                        <ul className="nav nav-tabs">
                            <li className="active h4"><Link to="#tab-description" data-toggle="tab">Description</Link></li>
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


                    <div className="productinfo-tab">
                        <ul className="nav nav-tabs">
                            <li className="active h4"><Link to="#tab-description" data-toggle="tab">Product Video</Link></li>
                        </ul>
                        <div class="youtube-video-container">
                            {product.productVideo &&
                                <iframe 
                                    class="youtube-video"
                                    width="100%"
                                    frameborder="0"
                                    src={`https://www.youtube.com/embed/${product.productVideo}?controls=1`}
                                >
                                </iframe>
                            }
                        </div>
                            
                    </div>


                </div>

            </div>



        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.FetchCategories,
    Auth: state.Auth,
    modalLoading: state.Modal
})

export default connect(mapStateToProps, {
    modal,
    cartQuantity,
})(SingleProductComponent);
