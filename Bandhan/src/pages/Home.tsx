import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import {connect} from "react-redux";
import {logout} from "../actions/authAction";
import './Home.css';

const Home: React.FC = (props:any) => {
  console.log("2")
  const IamPressed = ()=>
  {
    console.log("yooo")
    //props.logout()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
            
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={IamPressed} color="danger">Log Out</IonButton>
        <ExploreContainer  logout={props.logout}/>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps= (state:any) => ({
  Auth:state.Auth
})
export default connect(mapStateToProps, { 
  logout
})(Home);
