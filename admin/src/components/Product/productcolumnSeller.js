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
        title:'Image',
        dataIndex:'images',
        key:'images',
        render : (img)=>{
            if(img && Array.isArray(img) && img.length>0){
                return(
                    <img className="product-img" src={`${apis.BASE_SERVER_URL}${img[0]}`} />
                )
            }
            else{
                return null
            }
        }
    },
    {
        title:'Categories',
        dataIndex:'category',
        key:'category',
        render : (category)=>category.map((ele,i)=><Tag key={i} color={"cyan"}>{ele.name}</Tag>)
    },
    {
        title:'Stock',
        dataIndex:'stock',
        key:'stock'
    },
    {
        title:'Regular Price',
        dataIndex:'regularPrice',
        key:'regularPrice'
    },
    {
        title:'Sale Price',
        dataIndex:'salePrice',
        key:'salePrice'
    },
    {
        title : 'Stock Updated',
        dataIndex : 'stockUpdated',
        key:'stockUpdated',
        render : (data)=>(
            <Tag color={'geekblue'}>
                {moment(data).format("DD-MM-YYYY hh:mm")}
            </Tag>
        )
    },
    {
        title : "Operations",
        render : (data)=>(
            <Link to={`/dashboard/product/details/${data.productId}`}>
                <Button type="default">Details</Button>            
            </Link>
        )
    }
]

export default  columns;