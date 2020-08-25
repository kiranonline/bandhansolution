import moment from "moment";
import React from "react";
import {Tag} from "antd";


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title : 'Category Created',
        dataIndex : 'createdAt',
        key:'createdAt',
        render : (data)=>(
            <Tag color={'geekblue'}>
                {moment(data).format("DD-MM-YYYY hh:mm")}
            </Tag>
        )
    }
]

export default  columns;