import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,Carousel,Row,Col,Button,Tag,Typography,message } from 'antd';
import { logout } from "../../actions/authAction"; 
import {loading} from "../../actions/loadingAction";
import moment from "moment";
import {
    UserOutlined,
    UnorderedListOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import Errorhandler from "../../services/errorHandler";
import "./Product.less";
import {Link,useParams} from "react-router-dom";
import { Editor, EditorState, convertFromRaw } from "draft-js";
const { Title } = Typography;

function ProductDetailsAdmin(props) {
    const {id} = useParams();
    const [productDetails,setProductDetails] = useState();
    const [productDescription,setProductDescription] = useState(() => EditorState.createEmpty());


    const fetchProductDetails = ()=>{
        props.loading(true);
        http.get(`${apis.PRODUCT_DETAILS_FOR_ADMIN}/${id}`).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setProductDetails(result.data.data);
                const contentState = convertFromRaw(JSON.parse(result.data.data.description));
                const editorState = EditorState.createWithContent(contentState);
                setProductDescription(editorState)
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


    useEffect(()=>{
        fetchProductDetails();
    },[])

    return (
        <div className="product-details-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="Product Details"
                subTitle={productDetails?productDetails.name:""}
                extra={[<Link to="/dashboard/product/list" key="1"><Button key="1" type="primary"  icon={<UnorderedListOutlined />}>Product Lists</Button></Link>]}                
            />
            <div className="product-details-inner padding-after-page-header" >
                <Row gutter={16}>
                    <Col span="8">
                        <Carousel autoplay>
                            {productDetails && productDetails.images.map((ele,i)=>(
                                <img src={`${apis.BASE_SERVER_URL}${ele}`} key={i} className="product-image" />
                            ))}
                            
                        </Carousel>
                    </Col>
                    <Col span="16">
                        <div className="product-detains-inner">
                            <Row justify="space-between">
                                <Col>
                                    <Title level={2}>{productDetails && productDetails.name}</Title>
                                    {productDetails && <p className="regularPrice">Regular Price : {productDetails.regularPrice}</p>}
                                    {productDetails && productDetails.salePrice && <p className="salePrice">Sale Price : {productDetails.salePrice}</p>}
                                </Col>
                                <Col>
                                    <Title level={4}>{productDetails && moment(productDetails.createdAt).format("DD-MM-YYYY")}</Title>
                                </Col>
                            </Row>
                            
                            {productDetails && productDetails.category.map((ele,i)=>(<Tag key={i} color={"magenta"}>{ele.name}</Tag>))}
                            <div style={{marginBottom:'30px'}} />
                            <Editor editorState={productDescription} readOnly={true} />
                        </div>
                    </Col>
                </Row>
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
})(ProductDetailsAdmin);