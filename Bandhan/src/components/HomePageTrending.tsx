import React,{useState,useEffect} from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonContent } from '@ionic/react';
import {connect} from 'react-redux';
import {loading,openToast} from "../actions/loadingAction";
import apis from "../services/apis";
import http from "../services/httpCall";
import { constructOutline } from 'ionicons/icons';



function HomePageTrending(props:any) {
    const [trendingItems,setTrendingitems]:[any,any] = useState([undefined,undefined,undefined,undefined]);
    const [isLoading,setIsLoading] = useState(false);


    let fetchTrendingItems = ()=>{
        setIsLoading(true);
        http.get("/apis/v1/user/producthighlight/?limit=4&producttype=popular")
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
        .finally(()=>{
            setIsLoading(false)
        })
    }


    useEffect(()=>{
        fetchTrendingItems();
    },[])

    return (
        <div>
            <h4>Trending</h4>
            <IonGrid>
                <IonRow>
                    {trendingItems.map((ele:any,i:any)=>(
                        <IonCol size="6" key={i}>
                            <IonCard>
                                {ele?
                                    <>
                                        <img src={`${apis.BASE_SERVER_URL}/${ele!.images[0]}`} />
                                        <IonCardContent>
                                            {ele.name}
                                        </IonCardContent>
                                    </>
                                    :
                                    null
                                }
                                
                            </IonCard>
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
})(HomePageTrending);