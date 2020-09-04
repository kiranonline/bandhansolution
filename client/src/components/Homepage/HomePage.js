import React from "react";
import Crousel from "./Crousel";
import NewProduct from "./ProductCard";

function HomePage() {
  return (
    <div className="home-component">
      <Crousel />
      {/* product1 component  */}

      <div className="container">
        <NewProduct />
      </div>
      {/* Each has 4 card component */}
      {/* product2 component  */}
      {/* product3 component  */}
    </div>
  );
}

export default HomePage;
