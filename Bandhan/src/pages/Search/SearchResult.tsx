import { IonContent, IonHeader, IonPage, IonTitle, IonLabel, IonToolbar,IonItem, IonGrid, IonIcon,IonButtons, IonButton, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import './Search.css';
import http from '../../services/httpCall';
import apis from "../../services/apis";
import { openToast, loading } from "../../actions/loadingAction";
import { arrowBack } from 'ionicons/icons';
import { useIonViewWillEnter } from "@ionic/react";
import ItemCard from "../../components/ItemCard"
import { useTranslation } from 'react-i18next';


const SearcResult: React.FC = (props: any) => {
    const [productList,setProductList]:[any,any] = useState([]);
    const [sortby, setSortBy] = useState("");
    const history = useHistory();
    const { t } = useTranslation();


    const goBack = ()=>{
        history.goBack();
    }

    const fetchproducts = ()=>{
        props.loading(true)
        let URL = apis.GET_PRODUCT_LIST;
        URL = URL + window.location.search;
        if(sortby){
            URL = URL + `&sortType=${sortby}`;
        }
        http.get(URL).then((result)=>{
            console.log("res",result);
            if(result.data.status){
                setProductList(result.data.data)
            }else{
                console.log(result.data.message);
                props.openToast(result.data.message);
            }
        }).catch((err)=>{
            console.log(err);
            props.openToast("server error");
        }).finally(()=>{
            props.loading(false)
        })
    }

    useIonViewWillEnter(() => {
        setSortBy("")
        setProductList([])
        fetchproducts()
    });


    useEffect(() => {
        fetchproducts()
    }, [sortby])


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonButtons slot="start">
                        <IonButton onClick={goBack} className="search-page-back-button">
                                <IonIcon slot="icon-only" icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                    <IonTitle className="custom-heading-text">
                        {t('SearchresultPage.headerText')}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/* <IonItem>
                    <IonLabel>Sort By</IonLabel>
                    <IonSelect value={sortby} onIonChange={e => setSortBy(e.detail.value)}>
                        <IonSelectOption value="">Default</IonSelectOption>
                        <IonSelectOption value="hightolowprice">Price (Low &gt; High)</IonSelectOption>
                        <IonSelectOption value="lowtohighprice">Price (High &gt; Low)</IonSelectOption>
                        <IonSelectOption value="newest">Newest First</IonSelectOption>
                        <IonSelectOption value="oldest">Newest Last</IonSelectOption>
                        <IonSelectOption value="maxsold">Maximum Sold</IonSelectOption>
                        <IonSelectOption value="minsold">Minimum Sold</IonSelectOption>
                    </IonSelect>
                </IonItem> */}
                <IonGrid>
                    <IonRow>
                        {productList.map((ele:any,i:any)=>(
                            <IonCol size="6" key={i} className="ion-no-padding">
                                <ItemCard data={ele}/>
                            </IonCol>

                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};




const mapStateToProps = (state: any) => ({
    Auth: state.Auth
})
export default connect(mapStateToProps, {
    logout,
    openToast,
    loading
})(SearcResult);
