import React,{useState,useEffect} from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import {connect} from 'react-redux';
import {loading,openToast} from "../actions/loadingAction";
import apis from "../services/apis";
import http from "../services/httpCall";
import ItemCard from "./ItemCard"



function HomePageLates(props:any) {
    const [trendingItems,setTrendingitems]:[any,any] = useState([undefined,undefined,undefined,undefined]);


    let fetchLatestItems = ()=>{
        http.get(`${apis.FETCH_PRODUCT_HIGHLIGHT}?limit=4&producttype=new`)
        .then(res => {
            console.log(res.data);
            if(res.data.stauts){
                setTrendingitems(res.data.data)
            }
            else{
                props.openToast(res.data.message);
            }
        })
        .catch((err)=>{
            console.log(err)
            props.openToast("server error");
        })        
    }


    useEffect(()=>{
        fetchLatestItems();
    },[])

    return (
        <div>
            <h4 className="homepage-main-text-latest">Latest Products</h4>
            <IonGrid>
                <IonRow>
                    {trendingItems.map((ele:any,i:any)=>(
                        <IonCol size="6" key={i} className="ion-no-padding">
                            <ItemCard data={ele}/>
                        </IonCol>
                    ))}
                    
                </IonRow>
            </IonGrid>
        </div>
    )
}


const mapStateToProps= (state:any) => ({})
export default connect(mapStateToProps, { 
    loading,
    openToast
})(HomePageLates);