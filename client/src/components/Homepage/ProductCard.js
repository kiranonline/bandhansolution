import React from 'react'
import product1 from './static/images/product1.jpg'

function NewProduct() {
    return (
      <div className="item">
        <div className="product-thumb transition">
          <div className="image product-imageblock"> 
            <img src={product1} alt="product1" title="product1" className="img-responsive" /> 
            <button type="button" className="addtocart-btn btn btn-primary" >Add To Cart</button>
          </div>
          <div className="caption product-detail p-0 m-0">
            <h4 className="product-name">lorem ippsum dolor dummy</h4>
            <p className="price product-price">$122.00<span className="price-tax">Ex Tax: $100.00</span></p>
          </div>
        </div>
      </div>
    )
}

export default NewProduct
