import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer = (props:any) => {
  console.log("4")
  return (
    <div className="container">
      <IonButton color="danger" onClick={props.logout}>Log Out</IonButton>
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
