import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,message,Row,Col,Button, Form,Input, Upload, Select } from 'antd';
import { logout } from "../../actions/authAction"; 
import {loading} from "../../actions/loadingAction";
import { Link } from "react-router-dom";
import {
    LoadingOutlined,
    PlusCircleOutlined,
    UnorderedListOutlined,
    PlusOutlined
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { beforeUpload } from "../../services/beforeUpload";
import Errorhandler from "../../services/errorHandler";
import "./User.less";
const { Option } = Select;

function UserCreate(props) {
    const [form] = Form.useForm(); 
    const [avatar,setAvatar] = useState();
    const [isAvatarUploading,setIsAvatarUploading] = useState(false);
    const [userType,setUserType] = useState();

    const onFinish = (data)=>{
        if(!avatar){
            message.error("please upload an avatar.")
        }
        else{
            //console.log(avatar,data,apis.USER_CREATE);
            const {email,name,phoneNumber,userType,password,deliverTo} = data;
            props.loading(true);
            http.post(apis.USER_CREATE,{
                email,
                name,
                phoneNumber,
                userType,
                password,
                avatar,
                deliverTo
            }).then(result=>{
                console.log(result.data);
                if(result.data.status){
                    message.info("User created sucessfully");
                    form.resetFields();
                    setAvatar();
                    setUserType();
                }
                else{
                    message.error(result.data.message)
                }
            }).catch(err=>{
                console.log(err);
                Errorhandler(err,props.logout);
            }).finally(()=>{    
                props.loading(false);
            })
        }
    }

    const beforeUploadFunction = (file)=>{
        beforeUpload(file,['image/jpeg','image/png'],2,()=>{
            setIsAvatarUploading(true);
            const formData = new FormData();
            formData.append('avatar',file);
            http.post(apis.UPLOAD_USER_AVATAR,formData,{
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((result)=>{
                if(result.data.status){
                    setAvatar(result.data.file);
                }
                else{
                    message.error(result.data.message);
                }
            }).catch((err)=>{
                console.log(err);
                Errorhandler(err,props.logout);
            }).finally(()=>{
                setIsAvatarUploading(false);
            })
            
        })
        return false;
    }


    return (
        <div className="user-create-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="Create Users"
                subTitle="Add new User"
                extra={[<Link to="/admin/dashboard/user/list" key="1"><Button key="1" type="primary"  icon={<UnorderedListOutlined />}>List Users</Button></Link>]}                
            />
            <div className="user-create-from padding-after-page-header" >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    scrollToFirstError={true}
                    className="basic-form"
                >
                    <Row gutter={16}>
                        <Col span="12">
                            <Form.Item 
                                label="Name" 
                                name="name"
                                rules={[{ required: true, message: `Please enter the user's name!` }]}
                            >
                                <Input placeholder="Name"  />
                            </Form.Item>  
                            <Form.Item 
                                label="Email Id" 
                                name="email"
                                rules={[{ required: true, message: 'Please enter the email id!' },{type:'email',message:"Enter a valid email id"}]}
                            >
                                <Input placeholder="Email Id" />
                            </Form.Item>                         
                        </Col>
                        <Col span="12">
                            <ImgCrop grid={true} shape="round">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUploadFunction}

                                >
                                    {
                                        avatar?<img src={`${apis.BASE_SERVER_URL}${avatar}`} className="uploaded-avatar"/>
                                        :
                                        <div>
                                            {isAvatarUploading ? <LoadingOutlined /> : <PlusOutlined />}
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                    }
                                </Upload>
                            </ImgCrop>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span="12">
                            <Form.Item 
                                label="Phone Number" 
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please enter the phone number!' },{len:10,message:"Enter a valid phone number!"}]}
                            >
                                <Input type="number" placeholder="Phone Number" style={{width:'100%'}}/>
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item 
                                label="User type" 
                                name="userType"
                                rules={[{ required: true, message: `Please select one option!` }]}
                            >
                                <Select
                                    onChange={setUserType}
                                    placeholder="Select a user type"
                                >
                                    <Select.Option value="admin">Admin</Select.Option>
                                    <Select.Option value="seller">Seller</Select.Option>
                                    <Select.Option value="customer">Customer</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} align="bottom">
                        <Col span="12">
                            <Form.Item 
                                label="Password" 
                                name="password"
                                rules={[{ required: true, message: 'Please enter the password!' },{min:6,message:"Password must be atleast 6 character long!"}]}
                            >
                                <Input.Password type="password" placeholder="Password" />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item 
                                label="Confirm Password" 
                                name="ConfirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Please enter the password again!' },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The two passwords that you entered do not match!');
                                        },
                                    })
                                ]}
                            >
                                <Input.Password type="password" placeholder="Password" />
                            </Form.Item>
                        </Col>
                    </Row>
                    {
                        userType==="seller"?
                            <Row justify="center" gutter={16}>
                                <Col span={24}>
                                    <Form.Item 
                                        label="Delivery Pin Codes" 
                                        name="deliverTo"
                                    >
                                        <Select mode="tags" style={{ width: '100%', minHeight:'50px' }} tokenSeparators={[',']}>

                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            :
                            null
                    }
                    
                    <Row justify="end" gutter={16}>
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" >
                                    Create
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    Auth: state.Auth
});
export default connect(mapStateToProps, { 
    logout,
    loading
})(UserCreate);