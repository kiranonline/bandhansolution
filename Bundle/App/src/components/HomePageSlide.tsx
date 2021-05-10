import React,{useEffect,useState} from 'react';
import {IonSlides, IonSlide, IonContent } from "@ionic/react";
import banner1 from "../static/sliders/banner1.jpg";
import banner2 from "../static/sliders/banner2.jpg";
import banner3 from "../static/sliders/banner3.jpg";
import apis from "../services/apis";
import http from "../services/httpCall";


export default function HomePageSlide() {
    const [isLoading,setIsLoading]  = useState(true);
    const [posters, setPosters] = useState([])

    const fetchPosters = ()=>{
        setIsLoading(true)
        http.get(apis.LIST_POSTERS)
        .then((res:any) => {
            console.log(res.data.data);
            setPosters(res.data.data);
        }).catch((err:any)=>{
            console.log(err)
        }).finally(()=>{
            setIsLoading(false)
        })
    }
    useEffect(()=>{
        fetchPosters()
    },[])


    const slideOpts = {
        initialSlide: 1,
        speed: 400
    };

    return (
        <IonSlides pager={true} options={slideOpts} className="homepage-slider">
            {posters.map((ele,i)=>
                <IonSlide key={i}>
                    <img src={`${apis.BASE_SERVER_URL}${ele}`} />
                </IonSlide>
            )}
        </IonSlides>
    )
}
