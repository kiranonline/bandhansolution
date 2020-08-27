import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
// import { Layout,Row,Col } from 'antd';
// import { useLocation, Switch, Route } from "react-router-dom";
import "./Dashboard.less";



function Dashboard(props) {
    const [sideBarCollapsed,setSideBarCollapsed] = useState(false);

    let toggleSideBar = ()=>{
        setSideBarCollapsed(!sideBarCollapsed);
    }

    return (
        <div>
            Profile Page
        </div>    
    )
    
}


const mapStateToProps = (state) => ({
    Auth: state.Auth
});
export default connect(mapStateToProps, { 

})(Dashboard);




