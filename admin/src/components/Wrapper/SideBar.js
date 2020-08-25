import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {AdminSideBar,SellerSideBar} from "../../services/decideSideBar";
const { Sider } = Layout;

function SideBar(props) {
    return (
        <Sider key={props.Auth.userdetails} trigger={null} collapsible collapsed={props.sideBarCollapsed} className="dasboard-sidebar-wrapper">
            {
                props.Auth.userdetails.userType==='admin'?
                    <AdminSideBar />
                :null   
            }
            {
                props.Auth.userdetails.userType==='seller'?
                    <SellerSideBar />
                :null   
            }
        </Sider>
    )
}


const mapStateToProps = (state) => ({
    Auth: state.Auth
});
export default connect(mapStateToProps, { 

})(SideBar);
