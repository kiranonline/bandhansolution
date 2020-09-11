import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
}
};


function LatestNews() {

    const news = ["1", "2", "3", "4" ,"5"]

    return (
    <div className="blog">
        <h3 className="h2 mb-4">Latest News</h3>
        
        <Carousel responsive={responsive}>
            {news.map(e => 
                <div className="card news-card mx-3 border-0" key={e}>
                    <div className="img-holder">
                        <img className="card-img-top" src={`/blog/blog_${e}.jpg`} alt="Card image cap" />

                        <div className="date p-2 px-3">
                            06/07/2019
                        </div>

                        <a href="#" className="btn btn-danger btn-black">
                            Read More
                        </a>
                    </div>
                    <div className="card-body p-0 pt-3">
                        <a href="#" className="h4 card-title">Card title</a>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            )}
        </Carousel>
      </div>
    )
}

export default LatestNews
