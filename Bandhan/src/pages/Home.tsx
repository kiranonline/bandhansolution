import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { connect } from "react-redux";
import { logout } from "../actions/authAction";
import HomePageSlide from "../components/HomePageSlide";
import HomePageTrending from "../components/HomePageTrending"
import './Home.css';

const Home: React.FC = (props: any) => {
  console.log("2")
  const IamPressed = () => {
    console.log("yooo")
    props.logout()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="custom-header">
          <IonTitle className="custom-heading-text">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <HomePageSlide />
        <HomePageTrending />
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
