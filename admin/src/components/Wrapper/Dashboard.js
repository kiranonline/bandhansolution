import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Layout,Row,Col } from 'antd';
import { useLocation, Switch, Route } from "react-router-dom";
import "./Dashboard.less";
import Header from "./Header";
import SideBar from "./SideBar";   
import UserList from "../Users/UserList"; 
import UserCreate from "../Users/UserCreate";
import CategoryCreate from "../Category/CategoryCreate";
import CategoryList from "../Category/CategoryList";
import ProductCreate from "../Product/ProductCreate";
import ProductListAdmin from "../Product/ProductListAdmin";
import ProductDetailsAdmin from "../Product/ProductDetailsAdmin";



function Dashboard(props) {
    const [sideBarCollapsed,setSideBarCollapsed] = useState(false);

    let toggleSideBar = ()=>{
        setSideBarCollapsed(!sideBarCollapsed);
    }

    return (
        <Layout className="dashboard-container">
            <Header toggleSideBar={toggleSideBar}/>
            <Row className="dashboard-content-container">
                <Col>
                    <SideBar sideBarCollapsed={sideBarCollapsed}/>
                </Col>
                <Col className={"dashboard-content-col"+(sideBarCollapsed?" dashboadr-sidebar-collapsed":" dashboard-sidebar-normal")}>
                    <Layout.Content  className="dasboard-content-wrapper">
                        <div className="dashboard-content-inner">
                            <Switch>
                                <Route exact={true} path="/dashboard/user/list">
                                    <UserList />
                                </Route>
                                <Route exact={true} path="/dashboard/user/create">
                                    <UserCreate />
                                </Route>
                                <Route exact={true} path="/dashboard/category/create">
                                    <CategoryCreate />
                                </Route>
                                <Route exact={true} path="/dashboard/category/list">
                                    <CategoryList />
                                </Route> 
                                <Route exact={true} path="/dashboard/product/create">
                                    <ProductCreate />
                                </Route>
                                <Route exact={true} path="/dashboard/product/list">
                                    <ProductListAdmin />
                                </Route>
                                <Route exact={true} path="/dashboard/product/details/:id">
                                    <ProductDetailsAdmin />
                                </Route>
                            </Switch>
                        </div>   
                        <Layout.Footer className="dashboard-footer-wrapper">BANDHAN SOLUTIONS</Layout.Footer>    
                    </Layout.Content>
                </Col>
            </Row>
        </Layout>
    )
    
}


const mapStateToProps = (state) => ({
    Auth: state.Auth
});
export default connect(mapStateToProps, { 

})(Dashboard);



