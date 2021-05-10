import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {
    UserOutlined,
    UnorderedListOutlined,
    PlusCircleOutlined,
    ShoppingCartOutlined,
    BranchesOutlined,
    PictureOutlined
} from '@ant-design/icons';



export const AdminSideBar = (props)=>(
    <Menu  theme="dark" mode="inline">
        <Menu.SubMenu key="admin1" title={<span><UserOutlined /><span>USER</span></span>}>
            <Menu.Item  key="11">
                <Link to="/admin/dashboard/user/create">
                    <PlusCircleOutlined />
                    <span>CREATE USER</span>
                </Link>
            </Menu.Item>
            <Menu.Item  key="12">
                <Link to="/admin/dashboard/user/list">
                    <UnorderedListOutlined />
                    <span>USER LIST</span>
                </Link>
            </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="admin2" title={<span><BranchesOutlined /><span>CATEGORY</span></span>}>
            <Menu.Item  key="21">
                <Link to="/admin/dashboard/category/create">
                    <PlusCircleOutlined />
                    <span>CREATE CATEGORY</span>
                </Link>
            </Menu.Item>
            <Menu.Item  key="22">
                <Link to="/admin/dashboard/category/list">
                    <UnorderedListOutlined />
                    <span>CATEGORY LIST</span>
                </Link>
            </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="admin3" title={<span><ShoppingCartOutlined /><span>PRODUCT</span></span>}>
            <Menu.Item  key="31">
                <Link to="/admin/dashboard/product/create">
                    <PlusCircleOutlined />
                    <span>CREATE PRODUCT</span>
                </Link>
            </Menu.Item>
            <Menu.Item  key="32">
                <Link to="/admin/dashboard/product/list">
                    <UnorderedListOutlined />
                    <span>PRODUCT LIST</span>
                </Link>
            </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item  key="admin-44">
            <Link to={ `/admin/dashboard/orders`}>
                <ShoppingCartOutlined />
                <span>ORDERS</span>
            </Link>
        </Menu.Item>
        <Menu.Item  key="admin-54">
            <Link to={ `/admin/dashboard/posters`}>
                <PictureOutlined />
                <span>POSTERS</span>
            </Link>
        </Menu.Item>
    </Menu>
)

export const SellerSideBar = (props)=>(
    <Menu  theme="dark" mode="inline">
        <Menu.Item  key="32">
            <Link to="/admin/dashboard/product/list">
                <UnorderedListOutlined />
                <span>PRODUCT LIST</span>
            </Link>
        </Menu.Item>
        <Menu.Item  key="33">
            <Link to={ `/admin/dashboard/orders`}>
                <ShoppingCartOutlined />
                <span>ORDERS</span>
            </Link>
        </Menu.Item>
        <Menu.Item  key="34">
            <Link to={ `/admin/dashboard/profile/${props.user?props.user._id:""}`}>
                <UserOutlined />
                <span>PROFILE</span>
            </Link>
        </Menu.Item>

    </Menu>
)

