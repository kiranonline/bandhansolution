import moment from "moment";
import React from "react";
import {Tag,Button} from "antd";
import apis from "../../services/apis";
import {Link} from "react-router-dom";


const columns = [
    {
        title: 'Id',
        dataIndex: '_id',
        key: '_id'
    },
    {
        title:"Customer",
        dataIndex: 'user_details',
        key: 'user_details',
        render : (data)=>data.name
    },
    {
        title:"Address",
        dataIndex: 'address',
        key: 'address',
        render : (data)=>(
            <>
                <span>{data.city},</span>
                <span>{data.pincode}</span>
            </>
        )
    },
    {
        title: 'Placed On',
        dataIndex : 'createdAt',
        key:'createdAt',
        render : (data)=>(
            <Tag color={'geekblue'}>
                {moment(data).format("DD-MM-YYYY hh:mm:ss")}
            </Tag>
        )
    },
    {
        title : "Operations",
        render : (data)=>(
            <Link to={`/admin/dashboard/order/details/${data._id}`}>
                <Button type="default">Details</Button>            
            </Link>
        )
    }    
]

export default  columns;