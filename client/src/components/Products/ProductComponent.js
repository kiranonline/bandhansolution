import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import apis from "../../services/apis";
import http from "../../services/httpCall";

function ProductComponent() {
    const fetchProducts = (data)=>{
        http.get(apis.GET_PRODUCT_LIST).then((result)=>{
          console.log(result);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    
      useEffect(()=>{
        // fetchProducts();
      },[])


    return (
        <div class="container">
            <ul class="breadcrumb">
                {/* <li><Link to="/home"><i class="fa fa-home"></i></Link></li> */}
                <li>All Products</li>
            </ul>
            <div class="row">
                <div id="column-left" class="col-sm-3 hidden-xs column-left">
                <div class="column-block">
                    <div class="columnblock-title">Categories</div>
                    <div class="category_block">
                    <ul class="box-category treeview-list treeview">
                        <li>Tablets</li>
                        <li><a href="#">Software</a></li>
                        <li><a href="#">Phones & PDAs</a></li>
                        <li><a href="#">Cameras</a></li>
                        <li><a href="#">MP3 Players</a></li>
                    </ul>
                    </div>
                </div>
                </div>
                <div id="content" class="col-sm-9">
                <h2 class="category-title">Desktops</h2>
                <div class="row category-banner">
                    <div class="col-sm-12 category-image"><img src="image/banners/category-banner.jpg" alt="Desktops" title="Desktops" class="img-thumbnail" /></div>
                    <div class="col-sm-12 category-desc">Lorem ipsum dolomagna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</div>
                </div>
                <div class="category-page-wrapper">
                    <div class="col-md-6 list-grid-wrapper">
                    <div class="btn-group btn-list-grid">
                        <button type="button" id="list-view" class="btn btn-default list" data-toggle="tooltip" title="List"><i class="fa fa-th-list"></i></button>
                        <button type="button" id="grid-view" class="btn btn-default grid" data-toggle="tooltip" title="Grid"><i class="fa fa-th"></i></button>
                    </div>
                    <a href="#" id="compare-total">Product Compare (0)</a> </div>
                    <div class="col-md-1 text-right page-wrapper">
                    <label class="control-label" for="input-limit">Show :</label>
                    <div class="limit">
                        <select id="input-limit" class="form-control">
                        <option value="8" selected="selected">8</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                        </select>
                    </div>
                    </div>
                    <div class="col-md-2 text-right sort-wrapper">
                    <label class="control-label" for="input-sort">Sort By :</label>
                    <div class="sort-inner">
                        <select id="input-sort" class="form-control">
                        <option value="ASC" selected="selected">Default</option>
                        <option value="ASC">Name (A - Z)</option>
                        <option value="DESC">Name (Z - A)</option>
                        <option value="ASC">Price (Low &gt; High)</option>
                        <option value="DESC">Price (High &gt; Low)</option>
                        <option value="DESC">Rating (Highest)</option>
                        <option value="ASC">Rating (Lowest)</option>
                        <option value="ASC">Model (A - Z)</option>
                        <option value="DESC">Model (Z - A)</option>
                        </select>
                    </div>
                    </div>
                </div>
                <br />
                <div class="grid-list-wrapper">
                    <div class="product-layout product-list col-xs-12">
                    <div class="product-thumb">
                        <div class="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-3-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" class="img-responsive" /> </a>
                        <div class="button-group">
                            <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                            <button type="button" class="addtocart-btn">Add to Cart</button>
                            <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div class="caption product-detail">
                        <h4 class="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p class="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p class="price product-price"> $122.00 <span class="price-tax">Ex Tax: $100.00</span> </p>
                        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div class="button-group">
                        <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                        <button type="button" class="addtocart-btn">Add to Cart</button>
                        <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div class="product-layout product-list col-xs-12">
                    <div class="product-thumb">
                        <div class="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-4-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" class="img-responsive" /> </a>
                        <div class="button-group">
                            <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                            <button type="button" class="addtocart-btn">Add to Cart</button>
                            <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div class="caption product-detail">
                        <h4 class="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p class="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p class="price product-price"> $122.00 <span class="price-tax">Ex Tax: $100.00</span> </p>
                        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div class="button-group">
                        <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                        <button type="button" class="addtocart-btn">Add to Cart</button>
                        <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div class="product-layout product-list col-xs-12">
                    <div class="product-thumb">
                        <div class="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-5-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" class="img-responsive" /> </a>
                        <div class="button-group">
                            <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                            <button type="button" class="addtocart-btn">Add to Cart</button>
                            <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div class="caption product-detail">
                        <h4 class="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p class="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p class="price product-price"> $122.00 <span class="price-tax">Ex Tax: $100.00</span> </p>
                        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div class="button-group">
                        <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                        <button type="button" class="addtocart-btn">Add to Cart</button>
                        <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div class="product-layout product-list col-xs-12">
                    <div class="product-thumb">
                        <div class="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-6-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" class="img-responsive" /> </a>
                        <div class="button-group">
                            <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                            <button type="button" class="addtocart-btn">Add to Cart</button>
                            <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div class="caption product-detail">
                        <h4 class="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p class="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p class="price product-price"> $122.00 <span class="price-tax">Ex Tax: $100.00</span> </p>
                        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div class="button-group">
                        <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                        <button type="button" class="addtocart-btn">Add to Cart</button>
                        <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div class="product-layout product-list col-xs-12">
                    <div class="product-thumb">
                        <div class="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-7-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" class="img-responsive" /> </a>
                        <div class="button-group">
                            <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                            <button type="button" class="addtocart-btn">Add to Cart</button>
                            <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div class="caption product-detail">
                        <h4 class="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p class="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p class="price product-price"> $122.00 <span class="price-tax">Ex Tax: $100.00</span> </p>
                        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div class="button-group">
                        <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                        <button type="button" class="addtocart-btn">Add to Cart</button>
                        <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                    <div class="product-layout product-list col-xs-12">
                    <div class="product-thumb">
                        <div class="image product-imageblock"> <a href="product.html"> <img src="image/product/pro-8-220x294.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" class="img-responsive" /> </a>
                        <div class="button-group">
                            <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                            <button type="button" class="addtocart-btn">Add to Cart</button>
                            <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                        </div>
                        <div class="caption product-detail">
                        <h4 class="product-name"> <a href="product.html" title="lorem ippsum dolor dummy"> lorem ippsum dolor dummy </a> </h4>
                        <p class="product-desc"> More room to move.

                            With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.

                            Cover Flow.

                            Browse through your music collection by flipping..</p>
                        <p class="price product-price"> $122.00 <span class="price-tax">Ex Tax: $100.00</span> </p>
                        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div class="button-group">
                        <button type="button" class="wishlist" data-toggle="tooltip" title="Add to Wish List"><i class="fa fa-heart-o"></i></button>
                        <button type="button" class="addtocart-btn">Add to Cart</button>
                        <button type="button" class="compare" data-toggle="tooltip" title="Compare this Product"><i class="fa fa-exchange"></i></button>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="category-page-wrapper">
                    <div class="result-inner">Showing 1 to 8 of 10 (2 Pages)</div>
                    <div class="pagination-inner">
                    <ul class="pagination">
                        <li class="active"><span>1</span></li>
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

export default ProductComponent
