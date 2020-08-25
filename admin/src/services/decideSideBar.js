import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {
    UserOutlined,
    UnorderedListOutlined,
    PlusCircleOutlined,
    ShoppingCartOutlined,
    BranchesOutlined
} from '@ant-design/icons';

export const AdminSideBar = (props)=>(
    <Menu  theme="dark" mode="inline">  
        <Menu.SubMenu key="admin1" title={<span><UserOutlined /><span>USER</span></span>}>
            <Menu.Item  key="11">
                <Link to="/dashboard/user/create">
                    <PlusCircleOutlined />
                    <span>CREATE USER</span>
                </Link>
            </Menu.Item>
            <Menu.Item  key="12">
                <Link to="/dashboard/user/list">
                    <UnorderedListOutlined />
                    <span>USER LIST</span>
                </Link>
            </Menu.Item>
        </Menu.SubMenu>     
        <Menu.SubMenu key="admin2" title={<span><BranchesOutlined /><span>CATEGORY</span></span>}>
            <Menu.Item  key="21">
                <Link to="/dashboard/category/create">
                    <PlusCircleOutlined />
                    <span>CREATE CATEGORY</span>
                </Link>
            </Menu.Item>
            <Menu.Item  key="22">
                <Link to="/dashboard/category/list">
                    <UnorderedListOutlined />
                    <span>CATEGORY LIST</span>
                </Link>
            </Menu.Item>
        </Menu.SubMenu>         
        <Menu.SubMenu key="admin3" title={<span><ShoppingCartOutlined /><span>PRODUCT</span></span>}>
            <Menu.Item  key="31">
                <Link to="/dashboard/product/create">
                    <PlusCircleOutlined />
                    <span>CREATE PRODUCT</span>
                </Link>
            </Menu.Item>
            <Menu.Item  key="32">
                <Link to="/dashboard/product/list">
                    <UnorderedListOutlined />
                    <span>PRODUCT LIST</span>
                </Link>
            </Menu.Item>
        </Menu.SubMenu>
    </Menu>
)

export const SellerSideBar = (props)=>(
    <Menu  theme="dark" mode="inline">                
        <Menu.Item  key="32">
            <Link to="/dashboard/product/list">
                <UnorderedListOutlined />
                <span>PRODUCT LIST</span>
            </Link>
        </Menu.Item>
    </Menu>
)

