import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,Pagination,Row,Col,Table,Select,message } from 'antd';
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
const { Option } = Select;

function OrderListAdmin(props) {
    const [allSellers,setAllSellers]=useState([]);
    const [selectedSeller,setSelectedSeller] = useState()
    const [isTableLoading,setIstableLoading] = useState(false);
    const [orderData,setOrderData] = useState([]);
    const [currentPage,setCurrentpage] = useState(1);
    const [totalData,setTotalData] = useState(0);
    const [pageSize,setPageSize] = useState(5);


    const pageChanger=(page)=>{
        setCurrentpage(page);
    }


    const fetchUserData = ()=>{
        props.loading(true)
        let body = {
            pageNumber : 1,
            pageSize:1000000,
            userType : 'seller'
        }
        http.post(apis.LIST_USERS,body).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setAllSellers(result.data.data);
            }
            else{
                message.error(result.data.message);
            }
        }).catch((err)=>{
            console.log(err);
            Errorhandler(err,props.logout);
        }).finally(()=>{
            props.loading(false)
        })
    }


    const fetchOrderData = ()=>{
        setIstableLoading(true);
        let body = {
            pageNumber : currentPage,
            pageSize:pageSize,
            sellerId:selectedSeller
        }
        console.log(body)
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
        fetchUserData()
    },[])

    useEffect(()=>{
        if(selectedSeller){
            fetchOrderData();
        }
    },[currentPage,selectedSeller])

    const onSelect = (d)=>{
        console.log(d);
        setSelectedSeller(d)
    }

    return (
        <div className="product-list-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="All Orders"
                subTitle="List all orders"
                extra={[
                    <Select key="1" placeholder="select an option" value={selectedSeller}  style={{ width: 200 }} onSelect={onSelect}>
                        <Option>Select a seller</Option>
                        {allSellers.map((ele,i)=><Option key={i} value={ele._id}>{ele.name}</Option>)}
                    </Select>
                ]}
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
})(OrderListAdmin);