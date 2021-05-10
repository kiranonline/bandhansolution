import React,{ useEffect } from 'react';
import { connect } from "react-redux";
import { logout, setUserDetails } from "../../actions/authAction"; 
import EntryLoader from "../Loader/EntryLoader";
import Dashboard from "./Dashboard";
import http from "../../services/httpCall";
import apis from "../../services/apis";
import Errorhandler from "../../services/errorHandler";

function DashboardWrapper(props) {

    let fetchUserDetails = ()=>{
        http.get(apis.GET_USER_DETAILS).then((result)=>{
            if(result.data.status && (result.data.data.userType==='admin' || result.data.data.userType==='seller')){
                props.setUserDetails(result.data.data);
            }
            else{
                props.logout();
            }
        }).catch((err)=>{
            console.log(err);
            Errorhandler(err,props.logout)
        })
    }

    //fetching user details on component load
    useEffect(()=>{
        if(!props.Auth.userdetails){
            console.log(props.Auth.userdetails)
            fetchUserDetails();
        }        
    },[])

    return (
        <div>
            {props.Auth.userdetails?
                <Dashboard />
            :
                <EntryLoader />
            }
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    Auth: state.Auth,
});
  
export default connect(mapStateToProps, { setUserDetails, logout })(DashboardWrapper);

