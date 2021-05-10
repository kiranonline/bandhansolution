import React,{useState,useEffect} from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import http from "../../services/httpCall"
import apis from "../../services/apis"

function Crousel(props) {
    const [posters, setPosters] = useState([])
    const fetchPosters = ()=>{
        http.get(apis.LIST_POSTERS)
        .then(res => {
            console.log(res.data.data);
            setPosters(res.data.data);
        })
    }
    useEffect(()=>{
        fetchPosters()
    },[])
    return (
        <OwlCarousel
            className="owl-theme"
            items="1"
            loop
            autoplay
            dots
        >
            {posters.map((ele,i)=>
                <div key={i} className="item">
                    <a href="/">
                        <img src={`${apis.BASE_SERVER_URL}${ele}`} alt="main-banner1" className="img-responsive" />
                    </a>
                </div>
            )}
        </OwlCarousel>
    )
}

export default Crousel
