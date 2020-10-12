import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import http from "../../services/httpCall";
import apis from "../../services/apis";
import moment from "moment";
import "./Order.css"


function OrderDetails(props){
    const {id} = useParams();
    const [orderDetails,setOrderDetails] = useState();


    const fetchOrderDetails = ()=>{
        http.get(`${apis.ORDER_DETAILS}/${id}`).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setOrderDetails(result.data.data);
            }
            else{
                alert(result.data.message)
            }
        }).catch((err)=>{
            console.log(err);
        })
    }


    useEffect(()=>{
        fetchOrderDetails();
    },[])


    return(
        <div className="container p-4">
            <div className="card mb-3">
                <div className="row">
                    <div className="col-md-6 p-4">
                        {orderDetails?
                            <>
                                <h5>Delivery Address</h5>
                                <p className="mb-0">{orderDetails.address.lineone}</p>
                                <p className="mb-0">{orderDetails.address.locality}</p>
                                <p className="mb-0">{orderDetails.address.city},{orderDetails.address.state},{orderDetails.address.pincode}</p>
                            </>
                            :
                            null
                        }
                        
                    </div>
                    <div className="col-md-6 p-4">
                        {orderDetails?
                            <>
                                <h5>Order Details</h5>
                                <p className="mb-0">Id : {orderDetails._id}</p>
                                <p className="mb-0">Placed On : {moment(orderDetails.createdAt).format("DD-MM-YYYY hh:mm:ss")}</p>
                            </>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
            {orderDetails && orderDetails.items.map((ele,i)=>(
                <div className="card mb-3" key={i}>
                    <div className="row">
                        <div className="col-md-2 p-4">
                            <img className="item-image" src={`${apis.BASE_SERVER_URL}${ele.product.images[0]}`} />
                        </div>
                        <div className="col-md-8 p-4">
                            <p className="mb-0">Name : {ele.product.name}</p>
                            <p className="mb-0">Count : {ele.count}</p>
                            <p className="mb-0">Unit Price : {ele.unitPrice}</p>
                            <p className="mb-0">Total Price : {ele.totalPrice}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="timeline">
                                {
                                    ele.status.map((e,j)=>(
                                        <li className="li complete" key={j}>
                                            <div className="timestamp">
                                                <h4 className="author">{e.name}</h4>
                                                <h4 className="date">{moment(e.date).format("DD-MM-YYYY hh:mm:ss")}</h4>
                                            </div>
                                            <div className="status">
                                                <p>{e.remark}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                                
                            </ul>
                            

                        </div>
                    </div>
                </div>
            ))

            }
        </div>
    )
}



export default OrderDetails;