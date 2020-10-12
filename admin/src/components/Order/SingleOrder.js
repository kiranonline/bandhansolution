import React, {useState,useEffect} from "react";
import apis from "../../services/apis"
import { Timeline ,Descriptions, Select, Card, Button, message, Input   } from 'antd';
import moment from "moment";
import http from "../../services/httpCall";
const { Option } = Select;
const { TextArea } = Input;

function SubOrder(props) {
    const [options,setOptions]=useState([]);
    const [selectedOption,setSelectedOption]=useState();
    const [description,setDescription]=useState()

    useEffect(()=>{
        reCalculateOptions()
    },[props.data])

    const reCalculateOptions = ()=>{
        let opts=[];
        const lastStep =props.data.status[props.data.status.length - 1].name;
        if(lastStep==='placed'){
            opts = ['shipped','delivered']
        }
        else if(lastStep==='shipped'){
            opts = ['delivered']
        }
        setOptions(opts)
    }


    const onSelect = (d)=>{
        console.log(d);
        setSelectedOption(d)
    }

    const onDescriptionChange=(d)=>{
        setDescription(d.target.value)
    }

    const updateStatus = ()=>{
        if(selectedOption){
            props.loading(true)
            http.post(apis.UPDATE_ORDER_STATUS,{
                orderId : props.orderId,
                subOrderId : props.data._id,
                status : selectedOption,
                description : description
            }).then((result)=>{
                if(result.data.status){
                    message.success(result.data.message)
                }
                else{
                    message.error(result.data.message)
                }
            }).catch((err)=>{
                console.log(err);
                message.error("server error")
            }).finally(()=>{
                props.loading(false);
                props.fetchOrderDetails();
                setSelectedOption();
                setDescription()
            })
        }
        else{
            message.error("please select a status")
        }
    }


    return(
        <div>
            <Descriptions title="Item Info"  bordered>
                <Descriptions.Item label="Image">
                    <img className="item-image" src={`${apis.BASE_SERVER_URL}${props.data.product.images[0]}`} />
                </Descriptions.Item>
                <Descriptions.Item label="Name">{props.data.product.name}</Descriptions.Item>
                <Descriptions.Item label="Ordered Quantity">{props.data.count}</Descriptions.Item>
                <Descriptions.Item label="Unit Price">{props.data.unitPrice}</Descriptions.Item>
                <Descriptions.Item label="Total Price">{props.data.totalPrice}</Descriptions.Item>
            </Descriptions>
            <div className="status-tracker">
                <Timeline mode="left">
                    {
                        props.data.status.map((ele,i)=>(
                            <Timeline.Item label={`${ele.name} - ${moment(ele.date).format("DD-MM-YYYY hh:mm:ss")}`} key={i}>{ele.remark}</Timeline.Item>
                        ))
                    }
                </Timeline>
                <Card className="status-control">
                    Update Status<br />
                    <Select placeholder="select an option" value={selectedOption}  style={{ width: 200 }} onSelect={onSelect}>
                        <Option>Select an option</Option>
                        {options.map((ele,i)=><Option key={i} value={ele}>{ele}</Option>)}
                    </Select>
                    <TextArea value={description} rows={4} onChange={onDescriptionChange}/>
                    <Button onClick={updateStatus}>UPDATE</Button>
                </Card>
            </div>
        </div>
    )
}


export default SubOrder;