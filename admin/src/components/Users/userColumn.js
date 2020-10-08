import moment from "moment";
import React from "react";
import {Tag, Button} from "antd";
import { Link } from "react-router-dom";


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title:'Email Id',
        dataIndex:'email',
        key:'email'
    },
    {
        title:'Phone Number',
        dataIndex:'phoneNumber',
        key:'phoneNumber'
    },
    {
        title : 'Registration Timestamp',
        dataIndex : 'createdAt',
        key:'createdAt',
        render : (data)=>(
            <Tag color={'geekblue'}>
                {moment(data).format("DD-MM-YYYY hh:mm")}
            </Tag>
        )
    },
    {
        title : 'CONTROLS',
        dataIndex : 'createdAt',
        key:'createdAt',
        render : (data,row)=>(
            <>
                <Link to={`/dashboard/profile/${row._id}`}>Edit</Link>
            </>
        )
    }
]

export default  columns;