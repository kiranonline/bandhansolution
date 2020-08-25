import React from 'react';
import { Layout, Row, Col, Badge, Typography, Tooltip, Popover } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    SearchOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import { logout } from "../../actions/authAction"; 
import {connect} from "react-redux";


function Header(props) {
    return (
        <Layout.Header className="dashboard-header-wrapper" >
            <Row justify="space-between">
                <Col>
                    <Row gutter={20} align="middle">
                        <Col>
                            <Link to="/dashboard">
                                LOGO
                            </Link>
                        </Col>
                        <Col className="header-brand-name-wrapper">
                            <Typography.Title className="header-brand-name" level={3}>BANDHAN</Typography.Title>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row gutter={30}>
                        <Col>
                            <Badge dot={true}>
                                <BellOutlined  className="header-option-icons" />
                            </Badge>
                        </Col>
                        <Col>
                            <Popover placement="bottomRight" trigger="click">
                                <UserOutlined className="header-option-icons" />
                            </Popover>
                        </Col>
                        <Col>
                            <Tooltip title="logout">
                                <LogoutOutlined className="header-option-icons" onClick={props.logout}/>
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout.Header>
    )
}


const mapStateToProps = (state) => ({
    Theme : state.Theme
});

export default connect(mapStateToProps, { 
    logout
})(Header);

