import React, { useState, useEffect } from "react";
import Crousel from "./Crousel";
import NewProduct from "./ProductCard";
import http from "../../services/httpCall";


function HomePage() {
  
  const [highlighProducts, setHighlightProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  
  useEffect(() => {
    http.get("/apis/v1/user/producthighlight/?limit=4&producttype=popular")
      .then(res => {
        console.log(res.data.data);
        setHighlightProducts(res.data.data);
      })

    http.get("/apis/v1/user/producthighlight/?limit=4&producttype=new")
      .then(res => {
        console.log(res.data.data);
        setNewProducts(res.data.data);
      })
  }, [])

  return (
    <div className="home-component">
      <Crousel />
      {/* product1 component  */}

      <div className="container">
        <h2 className="h2 mb-3">Top Grossing</h2>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap">
          {
            highlighProducts
              .map(product => <NewProduct key={product.id} product={product} />)
          }
        </div>

        <div className="mt-2">
          <h2 className="h2 mb-3">New Arrivals</h2>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap">
            {
              newProducts
                .map(product => <NewProduct key={product.id} product={product} />)
            }
          </div>
        </div>
      </div>
      {/* Each has 4 card component */}
      {/* product2 component  */}
      {/* product3 component  */}
    </div>
  );
}

export default HomePage;
