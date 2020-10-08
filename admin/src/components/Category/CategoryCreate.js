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
const { Option } = Select;

function CategoryCreate(props) {
    const [form] = Form.useForm(); 
    
    const onFinish = (data)=>{
        console.log(data);
        let { name } =data;
        props.loading(true);
        http.post(apis.CATEGORY_CREATE,{name}).then(result=>{
            console.log(result.data);
            if(result.data.status){
                message.info("Category created sucessfully");
                form.resetFields();
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

    return (
        <div className="category-create-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="Create Category"
                subTitle="Add new Category"
                extra={[<Link to="/admin/dashboard/category/list" key="1"><Button key="1" type="primary"  icon={<UnorderedListOutlined />}>List Categories</Button></Link>]}                
            />
            <div className="category-create-from padding-after-page-header" >
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
                                label="Category Name" 
                                name="name"
                                rules={[{ required: true, message: `Please enter the category name!` }]}
                            >
                                <Input placeholder="Category Name"  />
                            </Form.Item>                          
                        </Col>
                    </Row>
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
})(CategoryCreate);