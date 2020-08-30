import React,{useEffect, useState} from 'react';
import {connect} from "react-redux";
import { Link,useParams } from 'react-router-dom'
import apis from "../../services/apis";
import http from "../../services/httpCall";
import {fetchProducts} from "../../actions/productListAction";

function ProductComponent(props) {
    let params=useParams();
    console.log(params);
    let [category_id,setCategoryId] =useState("");
    const fetchProducts = (data)=>{
        // let api = {}
        http.get(apis.GET_PRODUCT_LIST).then((result)=>{
          console.log(result);
          if(result.data.status){
              props.fetchProducts(result.data.data)
          }else{
              console.log(result.data.message);
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    
      useEffect(()=>{
        fetchProducts();
      },[])


    return (
        <div className="container">
            <ul className="breadcrumb">
                {/* <li><Link to="/home"><i className="fa fa-home"></i></Link></li> */}
                <li>All Products</li>
            </ul>
            <div className="row">
                <div id="column-left" className="col-sm-3 hidden-xs column-left">
                <div className="column-block">
                    <div className="columnblock-title">Categories</div>
                    <div className="category_block">
                    <ul className="box-category treeview-list treeview">
                        <li>Tablets</li>
                        <li><a href="#">Software</a></li>
                        <li><a href="#">Phones & PDAs</a></li>
                        <li><a href="#">Cameras</a></li>
                        <li><a href="#">MP3 Players</a></li>
                    </ul>
                    </div>
                </div>
                </div>
                <div id="content" className="col-sm-9">
                <h2 className="category-title">Desktops</h2>
                <div className="row category-banner">
                    <div className="col-sm-12 category-image"><img src="image/banners/category-banner.jpg" alt="Desktops" title="Desktops" className="img-thumbnail" /></div>
                    <div className="col-sm-12 category-desc">Lorem ipsum dolomagna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</div>
                </div>
                <div className="category-page-wrapper">
                    <div className="col-md-6 list-grid-wrapper">
                    <div className="btn-group btn-list-grid">
                        <button type="button" id="list-view" className="btn btn-default list" data-toggle="tooltip" title="List"><i className="fa fa-th-list"></i></button>
                        <button type="button" id="grid-view" className="btn btn-default grid" data-toggle="tooltip" title="Grid"><i className="fa fa-th"></i></button>
                    </div>
                    <a href="#" id="compare-total">Product Compare (0)</a> </div>
                    <div className="col-md-1 text-right page-wrapper">
                    <label className="control-label">Show :</label>
                    {/* <div className="limit">
                        <select id="input-limit" className="form-control">
                        <option  selected="selected">8</option>
                        <option >25</option>
                        <option >50</option>
                        <option >75</option>
                        <option >100</option>
                        </select>
                    </div> */}
                    </div>
                    <div className="col-md-2 text-right sort-wrapper">
                    <label className="control-label">Sort By :</label>
                    <div className="sort-inner">
                        <select id="input-sort" className="form-control">
                        <option>Default</option>
                        <option >Name (A - Z)</option>
                        <option >Name (Z - A)</option>
                        <option >Price (Low &gt; High)</option>
                        <option >Price (High &gt; Low)</option>
                        <option >Rating (Highest)</option>
                        <option >Rating (Lowest)</option>
                        <option >Model (A - Z)</option>
                        <option >Model (Z - A)</option>
                        </select>
                    </div>
                    </div>
                </div>
                <br />
                <div className="grid-list-wrapper">
                    <div className="product-layout product-list col-xs-12">
                    <div className="product-thumb">
                        <div className="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-3-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> </a>
                        <div className="button-group">
                            <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                            <button type="button" className="addtocart-btn">Add to Cart</button>
                            <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div className="caption product-detail">
                        <h4 className="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p className="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p className="price product-price"> $122.00 <span className="price-tax">Ex Tax: $100.00</span> </p>
                        <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div className="button-group">
                        <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                        <button type="button" className="addtocart-btn">Add to Cart</button>
                        <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div className="product-layout product-list col-xs-12">
                    <div className="product-thumb">
                        <div className="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-4-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> </a>
                        <div className="button-group">
                            <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                            <button type="button" className="addtocart-btn">Add to Cart</button>
                            <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div className="caption product-detail">
                        <h4 className="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p className="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p className="price product-price"> $122.00 <span className="price-tax">Ex Tax: $100.00</span> </p>
                        <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div className="button-group">
                        <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                        <button type="button" className="addtocart-btn">Add to Cart</button>
                        <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div className="product-layout product-list col-xs-12">
                    <div className="product-thumb">
                        <div className="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-5-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> </a>
                        <div className="button-group">
                            <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                            <button type="button" className="addtocart-btn">Add to Cart</button>
                            <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div className="caption product-detail">
                        <h4 className="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p className="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p className="price product-price"> $122.00 <span className="price-tax">Ex Tax: $100.00</span> </p>
                        <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div className="button-group">
                        <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                        <button type="button" className="addtocart-btn">Add to Cart</button>
                        <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div className="product-layout product-list col-xs-12">
                    <div className="product-thumb">
                        <div className="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-6-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> </a>
                        <div className="button-group">
                            <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                            <button type="button" className="addtocart-btn">Add to Cart</button>
                            <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div className="caption product-detail">
                        <h4 className="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p className="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p className="price product-price"> $122.00 <span className="price-tax">Ex Tax: $100.00</span> </p>
                        <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div className="button-group">
                        <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                        <button type="button" className="addtocart-btn">Add to Cart</button>
                        <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div className="product-layout product-list col-xs-12">
                    <div className="product-thumb">
                        <div className="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-7-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> </a>
                        <div className="button-group">
                            <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                            <button type="button" className="addtocart-btn">Add to Cart</button>
                            <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div className="caption product-detail">
                        <h4 className="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p className="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p className="price product-price"> $122.00 <span className="price-tax">Ex Tax: $100.00</span> </p>
                        <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div className="button-group">
                        <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                        <button type="button" className="addtocart-btn">Add to Cart</button>
                        <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div className="product-layout product-list col-xs-12">
                    <div className="product-thumb">
                        <div className="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-8-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> </a>
                        <div className="button-group">
                            <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                            <button type="button" className="addtocart-btn">Add to Cart</button>
                            <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div className="caption product-detail">
                        <h4 className="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p className="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p className="price product-price"> $122.00 <span className="price-tax">Ex Tax: $100.00</span> </p>
                        <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div className="button-group">
                        <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List"><i className="fa fa-heart-o"></i></button>
                        <button type="button" className="addtocart-btn">Add to Cart</button>
                        <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product"><i className="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="category-page-wrapper">
                    <div className="result-inner">Showing 1 to 8 of 10 (2 Pages)</div>
                    <div className="pagination-inner">
                    <ul className="pagination">
                        <li className="active"><span>1</span></li>
                        <li><a href="category.html">2</a></li>
                        <li><a href="category.html">&gt;</a></li>
                        <li><a href="category.html">&gt;|</a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    category_list: state.FetchCategories
  });

export default connect(mapStateToProps, {
    fetchProducts
  })(ProductComponent);
