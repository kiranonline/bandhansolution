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
import { Editor, EditorState, convertFromRaw } from "draft-js";


function SingleProductComponent(props) {
    let [product, setProduct] = useState({});
    const [productDescription,setProductDescription] = useState(() => EditorState.createEmpty());

    let {id}=useParams();
    // console.log(id);
    const fetchProduct = ()=>{
        http.get(apis.GET_SINGLE_PRODUCT+`${id}`)
        .then((result)=>{
            console.log(result);
            if(result.data.status){
                setProduct(result.data.data);
                console.log(result.data.data);
                const contentState = convertFromRaw(JSON.parse(result.data.data.description));
                const editorState = EditorState.createWithContent(contentState);
                console.log(editorState);
                setProductDescription(editorState);

            }else{
                console.log(result.data.message);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        fetchProduct();
        console.log(productDescription)
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
                                        <li key={data._id}><a href="#">{data.name}</a></li>
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
                                {(product.images && product.images.length>0) && product.images.map((image)=>(
                                    <div className="item"> <Link to="#"><img src={product.images?`${apis.BASE_SERVER_URL}${image}`:""} alt="product1" className="img-responsive" /></Link> </div>
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
                    <p className="product-desc">
                        <Editor editorState={productDescription} readOnly={true} />
                    </p> 
                    <div id="product">
                        <div className="form-group">
                        <label className="control-label qty-label" for="input-quantity">Qty</label>
                        <input type="text" name="quantity" value="1" size="2" id="input-quantity" className="form-control productpage-qty" />
                        <input type="hidden" name="product_id" value="48" />
                        <div className="btn-group">
                            <button type="button" id="button-cart" data-loading-text="Loading..." className="btn btn-primary btn-lg btn-block addtocart">Add to Cart</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="productinfo-tab">
                    <ul className="nav nav-tabs">
                    <li className="active"><a href="#tab-description" data-toggle="tab">Description</a></li>
                    </ul>
                    <div className="tab-content">
                    <div className="tab-pane active" id="tab-description">
                        <div className="cpt_product_description ">
                            <div>
                            <Editor editorState={productDescription} readOnly={true} />
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="tab-review">
                        <form className="form-horizontal">
                        <div id="review"></div>
                        <h2>Write a review</h2>
                        <div className="form-group required">
                            <div className="col-sm-12">
                            <label className="control-label" for="input-name">Your Name</label>
                            <input type="text" name="name" value="" id="input-name" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group required">
                            <div className="col-sm-12">
                            <label className="control-label" for="input-review">Your Review</label>
                            <textarea name="text" rows="5" id="input-review" className="form-control"></textarea>
                            <div className="help-block"><span className="text-danger">Note:</span> HTML is not translated!</div>
                            </div>
                        </div>
                        <div className="form-group required">
                            <div className="col-sm-12">
                            <label className="control-label">Rating</label>
                            &nbsp;&nbsp;&nbsp; Bad&nbsp;
                            <input type="radio" name="rating" value="1" />
                            &nbsp;
                            <input type="radio" name="rating" value="2" />
                            &nbsp;
                            <input type="radio" name="rating" value="3" />
                            &nbsp;
                            <input type="radio" name="rating" value="4" />
                            &nbsp;
                            <input type="radio" name="rating" value="5" />
                            &nbsp;Good</div>
                        </div>
                        <div className="buttons clearfix">
                            <div className="pull-right">
                            <button type="button" id="button-review" data-loading-text="Loading..." className="btn btn-primary">Continue</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps= (state) => ({
    categories: state.FetchCategories
})

export default connect(mapStateToProps, {

})(SingleProductComponent);
