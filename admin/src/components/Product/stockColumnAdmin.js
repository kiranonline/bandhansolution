import moment from "moment";
import React from "react";
import {Tag,Button} from "antd";
import apis from "../../services/apis";
import {Link} from "react-router-dom";


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber'
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock'
    },
    {
        title : 'Pin Codes',
        dataIndex : 'deliverTo',
        key:'deliverTo',
        render : (data)=>{
            let arr=data.map((ele,i)=>
                <Tag key={i}>
                    {ele}
                </Tag>
            )
            return arr
        }
    },
    
]

export default  columns;