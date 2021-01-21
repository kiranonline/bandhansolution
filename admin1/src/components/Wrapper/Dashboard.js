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
import ProductEdit from "../Product/ProductEdit"
import ProductListAdmin from "../Product/ProductListAdmin";
import ProductDetailsAdmin from "../Product/ProductDetailsAdmin";
import MyProfile from "../Profile/MyProfile"

import ProductListSeller from "../Product/ProductListSeller";
import ProductDetailsSeller from "../Product/ProductDetailsSeller";
import OrderListSeller from "../Order/OrderListSeller";
import OrderListAdmin from "../Order/OrderListAdmin"
import OrderDetails from "../Order/OrderDetails"
import Poster from "../Poster/Poster"


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
                    <SideBar key={props.Auth.userdetails} sideBarCollapsed={sideBarCollapsed} user={props.Auth.userdetails}/>
                </Col>
                <Col className={"dashboard-content-col"+(sideBarCollapsed?" dashboadr-sidebar-collapsed":" dashboard-sidebar-normal")}>
                    <Layout.Content  className="dasboard-content-wrapper">
                        {
                            props.Auth.userdetails.userType && props.Auth.userdetails.userType==='admin'?
                            <div className="dashboard-content-inner">
                                <Switch>
                                    <Route exact={true} path="/admin/dashboard/posters">
                                        <Poster />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/user/list">
                                        <UserList />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/user/create">
                                        <UserCreate />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/category/create">
                                        <CategoryCreate />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/category/list">
                                        <CategoryList />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/product/create">
                                        <ProductCreate />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/product/edit/:id">
                                        <ProductEdit />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/product/list">
                                        <ProductListAdmin />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/product/details/:id">
                                        <ProductDetailsAdmin />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/orders">
                                        <OrderListAdmin />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/order/details/:id">
                                        <OrderDetails />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/profile/:id">
                                        <MyProfile />
                                    </Route>
                                </Switch>
                            </div>
                            :
                            <div className="dashboard-content-inner">
                                <Switch>
                                    <Route path="/admin/dashboard/product/list">
                                        <ProductListSeller />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/product/details/:id">
                                        <ProductDetailsSeller />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/orders">
                                        <OrderListSeller />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/order/details/:id">
                                        <OrderDetails />
                                    </Route>
                                    <Route exact={true} path="/admin/dashboard/profile/:id">
                                        <MyProfile />
                                    </Route>
                                </Switch>
                            </div>
                        }

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




