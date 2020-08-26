import React from 'react'
import BrandHeader from './BrandHeader';
import NavbarHeader from './NavbarHeader';
import Crousel from './Crousel';
import NewProduct from './NewProduct';
import Footer from './Footer';

function HomePage() {
    return (
        <div>
            {/* Client side of kissan app. */}
            {/* header1 component*/}
            <BrandHeader />
            {/* header2 component */}
            <NavbarHeader />
            {/* crousel component  */}
            <Crousel />
            {/* product1 component  */}
            <NewProduct />
            {/* Each has 4 card component */}
            {/* product2 component  */}
            {/* product3 component  */}

            {/* footer component  */}
            <Footer />
        </div>
    )
}

export default HomePage
