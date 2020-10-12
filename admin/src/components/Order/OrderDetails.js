import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,Descriptions,Row,Col,Button,Tag,Typography,message } from 'antd';
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
import {Link,useParams} from "react-router-dom";
import SubOrder from "./SingleOrder"
const { Title } = Typography;

function OrderDetails(props) {
    const {id} = useParams();
    const [orderDetails,setOrderDetails] = useState();
    const [mySubOrder,setMySubOrder]=useState([])

    const fetchOrderDetails = ()=>{
        props.loading(true);
        http.get(`${apis.ORDER_DETAILS}/${id}`).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setOrderDetails(result.data.data);
                let ords =[];
                result.data.data.items.forEach(ele=>{
                    if(ele.seller._id==result.data.userId){
                        ords.push(ele)
                    }
                })
                setMySubOrder(ords)
                console.log("sub orders",ords)
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
        fetchOrderDetails();
    },[])

    return (
        <div className="order-details-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="Order Details"
                subTitle={id}
                extra={[<Link to="/admin/dashboard/orders" key="1"><Button key="1" type="primary"  icon={<UnorderedListOutlined />}>Orders</Button></Link>]}                
            />
            <div className="order-details-inner padding-after-page-header" >
                {orderDetails?
                    <>
                        <div className="details-info">
                            <Descriptions title="Customer Info"  bordered>
                                <Descriptions.Item label="Name">{orderDetails.user.name}</Descriptions.Item>
                                <Descriptions.Item label="Email Id">{orderDetails.user.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone Number">{orderDetails.user.phoneNumber}</Descriptions.Item>
                                <Descriptions.Item label="Address">
                                    <div>
                                        <div>{orderDetails.address.lineone}</div>
                                        <div>{orderDetails.address.locality}</div>
                                        <span>{orderDetails.address.city},</span>
                                        <span>{orderDetails.address.state},</span>
                                        <span>{orderDetails.address.pincode}</span>
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label="Ordered On">{moment(orderDetails.createdAt).format("DD-MM-YYYY hh:mm:ss")}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="item-details-wrapper">
                            {
                                mySubOrder.map((ele,i)=><SubOrder loading={props.loading} orderId={id} fetchOrderDetails={fetchOrderDetails} key={i} data={ele} />)
                            }
                        </div>
                    </>
                    
                    :
                    null
                }
                
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
})(OrderDetails);