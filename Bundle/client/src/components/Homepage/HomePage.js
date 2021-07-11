import React, { useState, useEffect } from "react";
import Crousel from "./Crousel";
import NewProduct from "./ProductCard";
import http from "../../services/httpCall";
import LatestNews from "./LatestNews";
import WeatherWidget from "./WeatherWidget"


function HomePage() {
  
  const [highlighProducts, setHighlightProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  
  useEffect(() => {
    console.log(navigator)
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

      <div className="container mt-4">
        <h2 className="h2 mb-4">Top Grossing</h2>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap">
          {
            highlighProducts
              .map(product => <NewProduct key={product._id} product={product} />)
          }
        </div>

        

        <hr className="my-4" style={{border: "1px solid #aaa"}}/>

        <div className="mt-5">
          <h2 className="h2 mb-4">New Arrivals</h2>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap">
            {
              newProducts
                .map(product => <NewProduct key={product._id} product={product} />)
            }
          </div>
        </div>

        <hr className="my-4" style={{border: "1px solid #aaa"}} />

        <div style={{width: "100%", height: "20px"}}>

        </div>
      
        <LatestNews className="mt-6"/>

        <WeatherWidget />

      {/* Each has 4 card component */}
      {/* product2 component  */}
      {/* product3 component  */}


    </div>
    </div>
  );
}

export default HomePage;
