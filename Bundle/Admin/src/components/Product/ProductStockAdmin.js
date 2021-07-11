import React,{ useState, useEffect } from 'react';
import { Table,Pagination,Row,Col,Typography,message } from 'antd';
import {loading} from "../../actions/loadingAction";
import moment from "moment";
import apis from "../../services/apis";
import http from "../../services/httpCall";
import Errorhandler from "../../services/errorHandler";
import column from "./stockColumnAdmin";
const { Title } = Typography;


export default function ProductStockAdmin(props) {
    const [productStock,setProductStock] = useState([]);
    const [isTableLoading,setIstableLoading] = useState(false);
    const [currentPage,setCurrentpage] = useState(1);
    const [totalData,setTotalData] = useState(0);
    const [pageSize,setPageSize] = useState(10);


    useEffect(()=>{
        fetchProducStock();
    },[currentPage])



    const fetchProducStock = ()=>{  
        setIstableLoading(true);
        let body = {
            productId:props._id,
            pageNumber : currentPage,
            pageSize:pageSize
        }
        http.post(`${apis.STOCK_LIST_FOR_ADMIN}`,body).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setTotalData(result.data.total);
                let stock = result.data.data.map(ele=>{
                    return{
                        ...ele,
                        ...ele.seller,
                        seller:null
                    }
                })
                console.log(stock)
                setProductStock(stock)
            }
            else{
                message.error(result.data.message)
            }
        }).catch((err)=>{
            console.log(err);
            Errorhandler(err,props.logout);
        }).finally(()=>{
            setIstableLoading(false);
        })
    }

    const pageChanger=(page)=>{
        setCurrentpage(page);
    }





    return (
        <div>
            <Table 
                scroll={{ x: 1000 }} 
                bordered={true} 
                pagination={false} 
                loading={isTableLoading} 
                dataSource={productStock} 
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
    )
}
