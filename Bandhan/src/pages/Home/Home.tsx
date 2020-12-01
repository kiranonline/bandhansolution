import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import React from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../actions/authAction";
import HomePageSlide from "../../components/HomePageSlide";
import HomePageTrending from "../../components/HomePageTrending";
import HomePageLates from "../../components/HomePageLatest"
import './Home.css';
import WeatherForeCast from "./WeatherForeCast"
import { search, logoWhatsapp } from 'ionicons/icons';


const Home: React.FC = (props: any) => {
  console.log("2")
  const history = useHistory();

  const IamPressed = () => {
    console.log("yooo")
    props.logout()
  }

  const goToSearch = ()=>{
    history.push("/secure/search")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="custom-header">
          <IonTitle className="custom-heading-text">Home</IonTitle>
          <IonButtons slot="secondary">
            <IonButton className="search-button" onClick={goToSearch}>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <HomePageSlide />
        <HomePageTrending />
        <HomePageLates />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <a href="https://api.whatsapp.com/send?phone=9563152391">
            <IonFabButton className="whatsapp-share-button">
              <IonIcon icon={logoWhatsapp} />
            </IonFabButton>
          </a>
          
        </IonFab>
        <WeatherForeCast />
      </IonContent>
    </IonPage>
  );
};




const mapStateToProps = (state: any) => ({
  Auth: state.Auth
})
export default connect(mapStateToProps, {
  logout
})(Home);
