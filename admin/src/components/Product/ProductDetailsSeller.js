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
import ProductDetailsCommon from "./ProductDetailsCommon";
import UpdateProductStock from "./UpdateProductStock";
const { Title } = Typography;

function ProductDetailsSeller(props) {
    const {id} = useParams();
    const [productDetails,setProductDetails] = useState();
    const [productDescription,setProductDescription] = useState(() => EditorState.createEmpty());


    const fetchProductDetails = ()=>{
        props.loading(true);
        http.get(`${apis.PRODUCT_DETAILS_FOR_SELLER}/${id}`).then((result)=>{
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
                <ProductDetailsCommon productDescription={productDescription} productDetails={productDetails}/>
                <UpdateProductStock productDetails={productDetails} />
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
})(ProductDetailsSeller);