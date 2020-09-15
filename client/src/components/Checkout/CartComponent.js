import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import http from "../../services/httpCall";
import apis from "../../services/apis";
import CategorySelector from '../GlobalComponents/CategorySelector';

function CartComponent(props) {
    let [cartDetails,setcartDetails] = useState([]);

    const fetchCart = ()=>{
        //fetch cart details of logged in user.
        http.get(apis.FETCH_THE_CART).then((result)=>{
            // console.log(result);
            if(result.data.status){
                console.log(result.data);
                console.log(result.data.data[0].product_details)
                setcartDetails(result.data.data[0].cart);
            }else{
                console.log(result.data.message);
                //Handle the error message.
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        fetchCart();
    },[]);

    useEffect(()=>{
        console.log(cartDetails);
    },[cartDetails]);


    return (
        <div className="container">
            <ul className="breadcrumb">
                <li><Link to="/"><i className="fa fa-home"></i>&nbsp;Home</Link></li>
            </ul>

            <div className="row">
                <CategorySelector />
                <div className="table-responsive col-md-9">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td className="text-center">Image</td>
                                <td className="text-left">Product Name</td>
                                <td className="text-left">Model</td>
                                <td className="text-left">Quantity</td>
                                <td className="text-right">Unit Price</td>
                                <td className="text-right">Total</td>
                            </tr>
                        </thead>
                        {cartDetails.map((cart,index)=>(
                            <tbody key={index}>
                                <tr>
                                    <td className="text-center"><Link to="/product"><img className="img-thumbnail" title="women's clothing" alt="women's clothing" src="image/product/2product50x59.jpg" /></Link></td>
                                    <td className="text-left"><Link to="/product">women's clothing</Link></td>
                                    <td className="text-left">product 11</td>
                                    <td className="text-left"><div style={{maxWidth: "200px"}} className="input-group btn-block">
                                        <input type="text" className="form-control quantity" disabled={true} size="1" value={cart.count} name="quantity" />
                                        <span className="input-group-btn">
                                        <button className="btn btn-primary" title="" data-toggle="tooltip" type="button" data-original-title="Update"><i className="fa fa-plus"></i></button>
                                        <button  className="btn btn-danger" title="" data-toggle="tooltip" type="button" data-original-title="Remove"><i className="fa fa-minus"></i></button>
                                        </span></div></td>
                                    <td className="text-right">$254.00</td>
                                    <td className="text-right">$254.00</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>

            
            <div className="buttons">
                {/* <div className="pull-left"><a className="btn btn-default" href="index-2.html">Continue Shopping</a></div> */}
                <div className="pull-right"><Link className="btn btn-primary" to="/checkout">Checkout</Link></div>
            </div>
        </div>
    )
}

const mapStateToProps= (state) => ({
    categories: state.FetchCategories,
    Auth: state.Auth,
    modalLoading: state.Modal
})

export default connect(mapStateToProps, {
})(CartComponent);

