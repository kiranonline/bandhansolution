import React from 'react';
import { PageHeader,Carousel,Row,Col,Button,Tag,Typography,message } from 'antd';
import apis from "../../services/apis";
import moment from "moment";
import { Editor, EditorState, convertFromRaw } from "draft-js";
const { Title } = Typography;


export default function ProductDetailsCommon(props) {
    return (
        <Row gutter={16}>
            <Col span="8">
                <Carousel autoplay>
                    {props.productDetails && props.productDetails.images.map((ele,i)=>(
                        <img src={`${apis.BASE_SERVER_URL}${ele}`} key={i} className="product-image" />
                    ))}
                    
                </Carousel>
            </Col>
            <Col span="16">
                <div className="product-detains-inner">
                    <Row justify="space-between">
                        <Col>
                            <Title level={2}>{props.productDetails && props.productDetails.name}</Title>
                            {props.productDetails && <p className="regularPrice">Regular Price : {props.productDetails.regularPrice}</p>}
                            {props.productDetails && props.productDetails.salePrice && <p className="salePrice">Sale Price : {props.productDetails.salePrice}</p>}
                            {props.productDetails && props.productDetails.properties && props.productDetails.properties.map((ele,i)=>(
                                <p className="properties-single" key={i}>{ele.type} : {ele.value} </p>
                            ))}
                        </Col>
                        <Col>
                            <Title level={4}>{props.productDetails && moment(props.productDetails.createdAt).format("DD-MM-YYYY")}</Title>
                        </Col>
                    </Row>
                    
                    {props.productDetails && props.productDetails.category.map((ele,i)=>(<Tag key={i} color={"magenta"}>{ele.name}</Tag>))}
                    <div style={{marginBottom:'30px'}} />
                    <Editor editorState={props.productDescription} readOnly={true} />
                </div>
            </Col>
        </Row>
    )
}
