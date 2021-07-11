import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,message,Row,Col,Button, Form,Input, Upload, Select } from 'antd';
import { logout } from "../../actions/authAction"; 
import {loading} from "../../actions/loadingAction";
import { Link,useParams } from "react-router-dom";
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
import "./MyProfile.less";
const { Option } = Select;

function MyProfile(props) {
    const {id} = useParams();
    const [form] = Form.useForm(); 
    const [avatar,setAvatar] = useState();
    const [isAvatarUploading,setIsAvatarUploading] = useState(false);
    const [userType,setUserType] = useState();
    const [profile,setProfile] = useState()

    useEffect(()=>{
        fetchProfileData()
    },[])

    const fetchProfileData = ()=>{
        props.loading(true);
        http.get(`${apis.GET_PROFILE_DETAILS}?_id=${id}`).then((result)=>{
            console.log(result.data);
            if(result.data.status){
                let user = result.data.data;
                setAvatar(user.avatar);
                form.setFieldsValue({ 
                    name:user.name,
                    email:user.email,
                    phoneNumber:user.phoneNumber   
                });
                setProfile(user)
                if(user.userType==='seller'){
                    form.setFieldsValue({ 
                        deliverTo:user.deliverTo  
                    });
                }
                setUserType(user.userType);
            }
            else{
                message.error(result.data.message)
            }
        }).catch((err)=>{
            console.log(err);
            message.error("server errror")
        }).finally(()=>{    
            props.loading(false);
        })
    }


    const onFinish = (data)=>{
        //console.log(avatar,data,apis.USER_CREATE);
        const {email,name,phoneNumber,deliverTo} = data;
        props.loading(true);
        http.post(apis.UPDATE_PROFILE_DETAILS,{
            _id:profile._id,
            email,
            name,
            phoneNumber,
            avatar,
            deliverTo
        }).then(result=>{
            console.log(result.data);
            if(result.data.status){
                message.info("User updated sucessfully");
                fetchProfileData();
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
        <div className="my-profile-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="PROFILE"
                subTitle="Edit profile"
                extra={[]}                
            />
            <div className="my-profile-from padding-after-page-header" >
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
                                    UPDATE
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
})(MyProfile);