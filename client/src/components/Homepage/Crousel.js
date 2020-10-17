import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import banner1 from './static/images/Main-Banner1.jpg';
import banner2 from './static/images/Main-Banner2.jpg';
import banner3 from './static/images/Main-Banner3.jpg';

function Crousel() {
    return (
            <OwlCarousel
            className="owl-theme"
            items="1"
            loop
            autoplay
            dots
            >
                <div className="item"> <a href="/"><img src={banner1} alt="main-banner1" className="img-responsive" /></a> </div>
                <div className="item"> <a href="/"><img src={banner2} alt="main-banner2" className="img-responsive" /></a> </div>
                <div className="item"> <a href="/"><img src={banner3} alt="main-banner3" className="img-responsive" /></a> </div>
            </OwlCarousel>
    )
}

export default Crousel
