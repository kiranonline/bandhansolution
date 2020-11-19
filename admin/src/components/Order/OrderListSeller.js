import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,Pagination,Row,Col,Button,Table,Select,message } from 'antd';
import { logout } from "../../actions/authAction"; 
import {loading} from "../../actions/loadingAction";
import {
    UserOutlined,
    UnorderedListOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import Errorhandler from "../../services/errorHandler";
import "./Order.less";
import column from "./OrderListColumn";
import {Link} from "react-router-dom";

function OrderListSeller(props) {
    const [isTableLoading,setIstableLoading] = useState(false);
    const [orderData,setOrderData] = useState([]);
    const [currentPage,setCurrentpage] = useState(1);
    const [totalData,setTotalData] = useState(0);
    const [pageSize,setPageSize] = useState(5);


    const pageChanger=(page)=>{
        setCurrentpage(page);
    }


    const fetchOrderData = ()=>{
        setIstableLoading(true);
        let body = {
            pageNumber : currentPage,
            pageSize:pageSize
        }
        http.post(apis.GET_ORDERS_LIST,body).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setOrderData(result.data.data);
                setTotalData(result.data.total);
            }
            else{
                message.error(result.data.message);
            }
        }).catch((err)=>{
            console.log(err);
            Errorhandler(err,props.logout);
        }).finally(()=>{
            setIstableLoading(false)
        })
    }


    useEffect(()=>{
        fetchOrderData();
    },[currentPage])

    

    return (
        <div className="product-list-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="All Orders"
                subTitle="List all orders"
            />
            <div className="product-list padding-after-page-header" >
                <Table 
                    scroll={{ x: 1200 }} 
                    bordered={true} 
                    pagination={false} 
                    loading={isTableLoading} 
                    dataSource={orderData} 
                    columns={column} 
                    rowKey="_id"
                    footer={() =>(
                        <Row gutter={16} justify="end">
                            <Col>
                                <Pagination pageSize={pageSize} current={currentPage} onChange={pageChanger} total={totalData} />
                            </Col>
                        </Row>
                    )}
                />
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
})(OrderListSeller);