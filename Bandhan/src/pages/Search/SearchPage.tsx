import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon,IonButtons, IonButton, IonCard, IonSkeletonText } from '@ionic/react';
import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import './Search.css';
import http from '../../services/httpCall';
import apis from "../../services/apis";
import { openToast, loading } from "../../actions/loadingAction";
import { arrowBack } from 'ionicons/icons';
import { useIonViewWillEnter } from "@ionic/react";




const SearchPage: React.FC = (props: any) => {
    const [loadingCategories,setloadingCategories] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [categories,setCategories]:[any,any] = useState([undefined,undefined,undefined,undefined,undefined]);
    const history = useHistory();

    const goBack = ()=>{
        history.goBack();
    }

    const fetchcategories = ()=>{
        setloadingCategories(true);
        setCategories([undefined,undefined,undefined,undefined,undefined])
        http.get(apis.GET_CATEGORY_LIST).then((result)=>{
            console.log(result.data);
            if(result.data.status){
                setCategories(result.data.data)
            }
            else{
                setCategories([])
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setloadingCategories(false)
        })
    }



    useIonViewWillEnter(() => {
        setSearchText("");
        fetchcategories()
    });


    const goToThisCategory = (catId:any)=>{
        console.log(catId);
        history.push(`/secure/products?category=${catId}`)
    }

    const searchGetResult = ()=>{
        if(searchText){
            history.push(`/secure/products?search=${searchText}`)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="custom-header">
                    <IonButtons slot="start">
                        <IonButton onClick={goBack} className="search-page-back-button">
                                <IonIcon slot="icon-only" icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                    <IonTitle className="custom-heading-text">Search</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="search-bar-wrapper">
                    <IonSearchbar placeholder="Search item" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}/>
                    <IonButton className="search-result-button" onClick={searchGetResult}>
                        Search
                    </IonButton>
                </div>

                <IonCard>
                    <h3 style={{textAlign:"center"}}>Select a category</h3>
                    {loadingCategories ? 
                        <IonSkeletonText animated style={{ width: '100%%',height:'100px' }}/>
                        :
                        <div className="category-container">
                            {categories.length===0?
                                <h4>No categories</h4>
                                :
                                categories.map((ele:any,i:any)=>{
                                    if(ele){
                                        return <span onClick={()=>goToThisCategory(ele._id)} className="categories-tag" key={i}>{ele.name}</span>
                                    }
                                })
                            }
                            
                        </div>
                    }
                </IonCard>
                
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
})(SearchPage);
