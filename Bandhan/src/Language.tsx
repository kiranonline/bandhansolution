import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import { IonApp } from '@ionic/react';
import RouterWrapper from "./RouteWrapper";
import { useTranslation } from 'react-i18next';

function Language(props:any) {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(props.Language.selectedlanguage)
    }, [props.Language])

    return (
        <IonApp>
            <Loader />
            <RouterWrapper />
            <Toast />
        </IonApp>
    )
}


const mapStateToProps= (state:any) => ({
    Language:state.Language
})
export default connect(mapStateToProps, {

})(Language);