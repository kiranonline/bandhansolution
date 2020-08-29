import React from 'react'
import product1 from './static/images/product1.jpg'

function NewProduct() {
    return (
        <div className="box">
            <div className="row product-slider">
              <div className="item">
                <div className="product-thumb transition">
                  <div className="image product-imageblock"> <img src={product1} alt="product1" title="product1" className="img-responsive" /> 
                    <div className="button-group">
                      <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart-o"></i></button>
                      <button type="button" className="addtocart-btn" >Add To Cart</button>
                      <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                    </div>
                  </div>
                  <div className="caption product-detail">
                    <h4 className="product-name">lorem ippsum dolor dummy</h4>
                    <p className="price product-price">$122.00<span className="price-tax">Ex Tax: $100.00</span></p>
                    <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                  </div>
                  <div className="button-group">
                    <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart-o"></i></button>
                    <button type="button" className="addtocart-btn" >Add To Cart</button>
                    <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                  </div>
                </div>
              </div>
              {/* <div className="item">
                <div className="product-thumb transition">
                  <div className="image product-imageblock"> <img src="image/product/product2.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> 
                    <div className="button-group">
                      <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart-o"></i></button>
                      <button type="button" className="addtocart-btn" >Add To Cart</button>
                      <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                    </div>
                  </div>
                  <div className="caption product-detail">
                    <h4 className="product-name">lorem ippsum dolor dummy</h4>
                    <p className="price product-price">$122.00<span className="price-tax">Ex Tax: $100.00</span></p>
                    <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                  </div>
                  <div className="button-group">
                    <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart-o"></i></button>
                    <button type="button" className="addtocart-btn" >Add To Cart</button>
                    <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="product-thumb transition">
                  <div className="image product-imageblock"> <img src="image/product/product3.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> 
                    <div className="button-group">
                      <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart-o"></i></button>
                      <button type="button" className="addtocart-btn" >Add To Cart</button>
                      <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                    </div>
                  </div>
                  <div className="caption product-detail">
                    <h4 className="product-name">lorem ippsum dolor dummy</h4>
                    <p className="price product-price">$122.00<span className="price-tax">Ex Tax: $100.00</span></p>
                    <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                  </div>
                  <div className="button-group">
                    <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart-o"></i></button>
                    <button type="button" className="addtocart-btn" >Add To Cart</button>
                    <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="product-thumb transition">
                  <div className="image product-imageblock"> <img src="image/product/product4.jpg" alt="lorem ippsum dolor dummy" title="lorem ippsum dolor dummy" className="img-responsive" /> 
                    <div className="button-group">
                      <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart-o"></i></button>
                      <button type="button" className="addtocart-btn" >Add To Cart</button>
                      <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                    </div>
                  </div>
                  <div className="caption product-detail">
                    <h4 className="product-name">lorem ippsum dolor dummy</h4>
                    <p className="price product-price">$122.00<span className="price-tax">Ex Tax: $100.00</span></p>
                    <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div>
                  </div>
                  <div className="button-group">
                    <button type="button" className="wishlist" data-toggle="tooltip" title="Add to Wish List" ><i className="fa fa-heart-o"></i></button>
                    <button type="button" className="addtocart-btn" >Add To Cart</button>
                    <button type="button" className="compare" data-toggle="tooltip" title="Compare this Product" ><i className="fa fa-exchange"></i></button>
                  </div>
                </div>
    </div> */}
        </div> 
        </div>
    )
}

export default NewProduct
