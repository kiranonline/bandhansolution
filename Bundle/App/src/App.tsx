import React,{useState,useEffect} from 'react';
import apis from "./services/apis";
import http from "./services/httpCall"
import { login, setUserDetails,logout, setGeoCordinates, changeLanguage } from "./actions/authAction";
import {connect} from 'react-redux';
import { Plugins } from '@capacitor/core';
import Language from "./Language";
const { Storage } = Plugins;






const App: React.FC = (props:any) =>{

  const getToken = async()=>{
    const Token = await Storage.get({ key: 'Token' });
    console.log(Token.value);
    if(Token.value && Token.value!=="null" && Token.value!=="undefined"){
      props.login(Token.value);
    }
  }


  const getAppLanguage = async()=>{
    const Language = await Storage.get({ key: 'default_language' });
    console.log(Language.value);
    if(Language.value && Language.value!=="null" && Language.value!=="undefined"){
      props.changeLanguage(Language.value)
    }
  }


  let fetchUserDetails = ()=>{
    http.get(apis.GET_USER_DETAILS).then((result)=>{
      console.log(result);
      if(result.data.status){
          props.setUserDetails(result.data.data);
      }
      else{
          props.logout();
      }
    }).catch((err)=>{
      console.log(err);
      props.logout()
    })
  }

  console.log("1")
  getToken();
  getAppLanguage();


  useEffect(()=>{
    fetchUserDetails();
    props.setGeoCordinates()
  },[])



  return(
    <Language />
  )
};




const mapStateToProps= (state:any) => ({

})
export default connect(mapStateToProps, {
  login,
  setUserDetails,
  logout,
  setGeoCordinates,
  changeLanguage
})(App);
