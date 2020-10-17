import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Card,message,Row,Col,Button, Form,Input, Upload, Select } from 'antd';
import { logout } from "../../actions/authAction"; 
import {loading} from "../../actions/loadingAction";
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { beforeUpload } from "../../services/beforeUpload";
import Errorhandler from "../../services/errorHandler";

function UpdateProductStock(props) {
    const [form] = Form.useForm(); 
    const [isDisabled,setIsDisabled] = useState(true)


    const onFinish = (data)=>{
        if(isDisabled){
            setIsDisabled(false);
        }
        else{
            let {stock} = data;
            try{
                let n = parseInt(stock);
                if(n>=0){
                    props.loading(true);
                    http.post(apis.UPDATE_PRODUCT_STOCK_SELLER,{
                        id : props.productDetails._id,
                        stock
                    }).then((result)=>{
                        console.log(result.data)
                        if(result.data.status){
                            message.success(result.data.message)
                            setIsDisabled(true);
                        }
                        else{
                            message.error(result.data.message)
                        }
                    }).catch((err)=>{
                        console.log(err);
                        Errorhandler(err,props.logout);
                    }).finally(()=>{
                        props.loading(false);
                    })
                }
                else{
                    message.error("Please enter a valid stock number")
                }
            }
            catch(err){
                message.error("Please enter a valid stock number")
            }
        }
    }


    useEffect(()=>{
        form.setFieldsValue({
            stock:props.productDetails?.stock
        })
    },[props.productDetails])







    return (
        <Card
            title="Stock management"
            style={{marginTop:'50px'}}
        >
        
            <Form
                layout="inline"
                form={form}
                onFinish={onFinish}
                scrollToFirstError={true}
                className="basic-form"
                initialValues={{
                    stock:props.productDetails?.stock
                }}
            >
                <Form.Item 
                    name="stock"
                    rules={[{ required: true, message: `Please enter the stock` }]}
                >
                    <Input disabled={isDisabled} placeholder="Stock" type="number"  />
                </Form.Item> 
                <Form.Item>
                    <Button type="primary" htmlType="submit">EDIT</Button>
                </Form.Item>
            </Form>
        </Card>
        
        
    )
}


const mapStateToProps = (state) => ({
    Auth: state.Auth
});
export default connect(mapStateToProps, { 
    logout,
    loading
})(UpdateProductStock);