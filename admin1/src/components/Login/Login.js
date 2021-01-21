import React from 'react';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { loading } from "../../actions/loadingAction";
import { connect } from "react-redux";
import Errorhandler from "../../services/errorHandler";
import { Typography, Form, Input, Button, message } from 'antd';
import { MailOutlined , LockOutlined } from '@ant-design/icons';
import { login, setUserDetails, logout } from "../../actions/authAction"
import "./login.less";
import brandLogo from "../../static/brand-logo.png"



function Login(props) {

    let onFinish = (values)=>{
        console.log(`getting ${values} from the form`);
        props.loading(true);
        http.post(apis.LOGIN_WITH_EMAIL_AND_PASSWORD,values).then((result)=>{
            console.log(result.data);
            if(result.data.status && (result.data.data.userType==='admin' || result.data.data.userType==='seller')){
                localStorage.setItem("Token", result.data.token);
                props.login(result.data.token,result.data.data);
            }
            else{
                message.error(result.data.message);
            }
        }).catch((err)=>{
            console.log(err);   
            Errorhandler(err,props.logout)
        }).finally(()=>{
            props.loading(false);
        })
    }

    return (
        <div className="login-page-container">
            <div className="login-section-wrapper">
                <Typography.Title level={1}>BANDHAN</Typography.Title>
                
                <img src={brandLogo} style={{width:'100px',marginBottom:'20px'}} />
                <p className="brand-sub-name">ADMIN PANEL</p>
                <Form
                    name="login-form"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        hasFeedback={true}
                        rules={[
                            { 
                                required: true, 
                                message: 'Please input your E-mail!' 
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email id" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback={true}
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                    {/* <Form.Item>
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item> */}
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Auth: state.Auth,
});
  
export default connect(mapStateToProps, { 
    loading,
    login,
    setUserDetails,
    logout
})(Login);