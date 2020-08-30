import React from 'react';
// import {fetchProduct} from ""
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import product1 from "../static/images/product1.jpg";

function SingleProductComponent() {
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
                            <li><a href="#">Tablets</a></li>
                            <li><a href="#">Software</a></li>
                            <li><a href="#">Phones</a></li>
                            <li><a href="#">Cameras</a></li>
                            <li><a href="#">MP3 Players</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content" className="col-sm-9">
                <div className="row">
                    <div className="col-sm-6">
                    <div className="thumbnails">
                        <div><a className="thumbnail" href="image/product/product8.jpg" title="lorem ippsum dolor dummy"><img src={product1} title="lorem ippsum dolor dummy" alt="lorem ippsum dolor dummy" /></a></div>
                        <div id="product-thumbnail" className="owl-carousel">
                        <div className="item">
                            <div className="image-additional"><a className="thumbnail  " href="image/product/product1.jpg" title="lorem ippsum dolor dummy"> <img src="image/product/pro-1-220x294.jpg" title="lorem ippsum dolor dummy" alt="lorem ippsum dolor dummy" /></a></div>
                        </div>
                        <div className="item">
                            <div className="image-additional"><a className="thumbnail  " href="image/product/product2.jpg" title="lorem ippsum dolor dummy"> <img src="image/product/pro-2-220x294.jpg" title="lorem ippsum dolor dummy" alt="lorem ippsum dolor dummy" /></a></div>
                        </div>
                        <div className="item">
                            <div className="image-additional"><a className="thumbnail  " href="image/product/product3.jpg" title="lorem ippsum dolor dummy"> <img src="image/product/pro-3-220x294.jpg" title="lorem ippsum dolor dummy" alt="lorem ippsum dolor dummy" /></a></div>
                        </div>
                        <div className="item">
                            <div className="image-additional"><a className="thumbnail  " href="image/product/product4.jpg" title="lorem ippsum dolor dummy"> <img src="image/product/pro-4-220x294.jpg" title="lorem ippsum dolor dummy" alt="lorem ippsum dolor dummy" /></a></div>
                        </div>
                        <div className="item">
                            <div className="image-additional"><a className="thumbnail  " href="image/product/product5.jpg" title="lorem ippsum dolor dummy"> <img src="image/product/pro-5-220x294.jpg" title="lorem ippsum dolor dummy" alt="lorem ippsum dolor dummy" /></a></div>
                        </div>
                        <div className="item">
                            <div className="image-additional"><a className="thumbnail  " href="image/product/product6.jpg" title="lorem ippsum dolor dummy"> <img src="image/product/pro-6-220x294.jpg" title="lorem ippsum dolor dummy" alt="lorem ippsum dolor dummy" /></a></div>
                        </div>
                        <div className="item">
                            <div className="image-additional"><a className="thumbnail  " href="image/product/product7.jpg" title="lorem ippsum dolor dummy"> <img src="image/product/pro-7-220x294.jpg" title="lorem ippsum dolor dummy" alt="lorem ippsum dolor dummy" /></a></div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-6">
                    <h1 className="productpage-title">lorem ippsum dolor dummy</h1>
                    <div className="rating product"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-1x"></i><i className="fa fa-star-o fa-stack-1x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x"></i></span> <span className="review-count"> <a href="#" onClick="$('a[href=\'#tab-review\']').trigger('click'); return false;">1 reviews</a> / <a href="#" onClick="$('a[href=\'#tab-review\']').trigger('click'); return false;">Write a review</a></span>
                        <hr/>
                        <div className="addthis_toolbox addthis_default_style"><a className="addthis_button_facebook_like" ></a> <a className="addthis_button_tweet"></a> <a className="addthis_button_pinterest_pinit"></a> <a className="addthis_counter addthis_pill_style"></a></div>
                        
                    </div>
                    <ul className="list-unstyled productinfo-details-top">
                        <li>
                        <h2 className="productpage-price">$122.00</h2>
                        </li>
                        <li><span className="productinfo-tax">Ex Tax: $100.00</span></li>
                    </ul>
                    <hr />
                    <ul className="list-unstyled product_info">
                        <li>
                        <label>Brand:</label>
                        <span> <a href="#">Apple</a></span></li>
                        <li>
                        <label>Product Code:</label>
                        <span> product 20</span></li>
                        <li>
                        <label>Availability:</label>
                        <span> In Stock</span></li>
                    </ul>
                    <hr />
                    <p className="product-desc"> More room to move.
                        With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.
                        Cover Flow.
                        Browse through your music collection by flipping..</p>
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
                    <li><a href="#tab-review" data-toggle="tab">Reviews (1)</a></li>
                    </ul>
                    <div className="tab-content">
                    <div className="tab-pane active" id="tab-description">
                        <div className="cpt_product_description ">
                            <div>
                            <p> <strong>More room to move.</strong></p>
                            <p> With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go.</p>
                            <p> <strong>Cover Flow.</strong></p>
                            <p> Browse through your music collection by flipping through album art. Select an album to turn it over and see the track list.</p>
                            <p> <strong>Enhanced interface.</strong></p>
                            <p> Experience a whole new way to browse and view your music and video.</p>
                            <p> <strong>Sleeker design.</strong></p>
                            <p> Beautiful, durable, and sleeker than ever, lorem ippsum dolor dummy now features an anodized aluminum and polished stainless steel enclosure with rounded edges.</p>
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
    
})

export default connect(mapStateToProps, {

})(SingleProductComponent);
