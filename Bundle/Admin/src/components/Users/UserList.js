import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,Pagination,Row,Col,Button,Table,Select,message } from 'antd';
import { logout } from "../../actions/authAction"; 
import {loading} from "../../actions/loadingAction";
import { Link } from "react-router-dom";
import {
    UserOutlined,
    UnorderedListOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import Errorhandler from "../../services/errorHandler";
import "./User.less";
import column from "./userColumn";

function UserList(props) {
    const [isTableLoading,setIstableLoading] = useState(false);
    const [userData,setUserData] = useState([]);
    const [currentPage,setCurrentpage] = useState(1);
    const [totalData,setTotalData] = useState(0);
    const [pageSize,setPageSize] = useState(10);
    const [userType,setUserType] = useState("customer");

    const pageChanger=(page)=>{
        setCurrentpage(page);
    }

    const onUserTypeChange = (value)=>{
        setCurrentpage(1);
        setUserType(value);
    }

    const fetchUserData = ()=>{
        setIstableLoading(true);
        let body = {
            pageNumber : currentPage,
            pageSize:pageSize,
            userType : userType
        }
        http.post(apis.LIST_USERS,body).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setUserData(result.data.data);
                setTotalData(result.data.total)
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
        fetchUserData();
    },[currentPage,userType])

    return (
        <div className="user-list-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="All Users"
                subTitle="List all Users"
                extra={[<Link to="/admin/dashboard/user/create" key="1"><Button key="1" type="primary"  icon={<PlusCircleOutlined />}>Create User</Button></Link>]}                
            />
            <div className="user-list padding-after-page-header" >
                <Table 
                    scroll={{ x: 1000 }} 
                    bordered={true} 
                    pagination={false} 
                    loading={isTableLoading} 
                    dataSource={userData} 
                    columns={column} 
                    rowKey="_id"
                    title={() =>(
                        <Row gutter={16} justify="end">
                            <Col>
                                <Select
                                style={{width:'200px'}}
                                    value={userType}
                                    onChange={onUserTypeChange}
                                >
                                    <Select.Option value="admin">Admin</Select.Option>
                                    <Select.Option value="seller">Seller</Select.Option>
                                    <Select.Option value="customer">Customer</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    )}
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
})(UserList);