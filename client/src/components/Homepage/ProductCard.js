import React from 'react'
import product1 from './static/images/product1.jpg'

function NewProduct({product}) {
    return (
      <div className="itemcard">
        <div className="product-thumb transition">
          <div className="image product-imageblock"> 
            <img src={`http://localhost:4500/${product.images[0]}`} alt="product1" title="product1" width="200px" /> 
            <button type="button" className="addtocart-btn btn btn-primary" >Add To Cart</button>
          </div>
          <div className="caption product-detail p-0 m-0 mt-4">
            <h4 className="product-name">{product.name}</h4>
            <div className="d-flex align-items-center">
              <p 
                className={product.salePrice ? "m-0 text-danger strikethrough" : "h3 m-0"}>
                  ₹{product.regularPrice}
              </p>
              <p className={product.salePrice ? "h3 d-block" : "d-none"}>
              ₹{product.salePrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default NewProduct
