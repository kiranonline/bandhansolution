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
import column from "./categoryColumn";

function CategoryList(props) {
    const [isTableLoading,setIstableLoading] = useState(false);
    const [categoryData,setCategoryData] = useState([]);
    const [totalData,setTotalData] = useState(0);
    const [currentPage,setCurrentpage] = useState(1);
    const [pageSize,setPageSize] = useState(2);

    const pageChanger=(page)=>{
        setCurrentpage(page);
    }

    const fetchCategoryData = ()=>{
        setIstableLoading(true);
        let body = {
            pageNumber : currentPage,
            pageSize:pageSize
        }
        http.post(apis.LIST_CATEGORY,body).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setCategoryData(result.data.data);
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
        fetchCategoryData();
    },[currentPage])

    return (
        <div className="category-list-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="All Categories"
                subTitle="List all Categories"
                extra={[<Link to="/dashboard/category/create" key="1"><Button key="1" type="primary"  icon={<PlusCircleOutlined />}>Create Category</Button></Link>]}                
            />
            <div className="category-list padding-after-page-header" >
                <Table 
                    scroll={{ x: 1000 }} 
                    bordered={true} 
                    pagination={false} 
                    loading={isTableLoading} 
                    dataSource={categoryData} 
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
})(CategoryList);