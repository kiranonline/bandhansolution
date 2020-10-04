import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import http from "../../services/httpCall";
import apis from "../../services/apis";
import CategorySelector from '../GlobalComponents/CategorySelector';

function CartComponent(props) {
    let [cartDetails,setcartDetails] = useState([]);
    let [products, setProducts] = useState([]);

    let [cart_id, setCartId] = useState("");
    let [updating, setUpdating] = useState(false);

    const fetchCart = ()=>{
        //fetch cart details of logged in user.
        http.get(apis.FETCH_THE_CART).then((result)=>{
            // console.log(result);
            if(result.data.status){
                
                setCartId(result.data.data._id)

                setcartDetails(result.data.data.cart);
                // console.log(result.data.cart);
                setProducts(result.data.data.product_details);

                
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


    const updateQty = (i, amount) => {
        
        setcartDetails(old => old.map(item => {

            if (item._id !== i) return item;
            return {...item, count: item.count + amount}    
        }))

        updatecart();
    }

    const deleteItem = async(productID) => {

        if (!window.confirm("Are you sure you want to delete this, this is irreversible!")) return;

        setProducts(old => old.filter(item => {
            return item._id !== productID
        }));

        let x = cartDetails.filter(e => e.product !== productID);

        setcartDetails(x);

        updatecart(x) ;
    }

    const updatecart = (x = null) => {

        setUpdating(true);

        let data = {
            _id: cart_id,
            cart: cartDetails
        }
        if(x !== null){
            data = {
                ...data,
                cart: x
            }
        }


        http.post(apis.UPDATE_CART, data)
            .then(res => {
                if(res.data.status){
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err))
            .finally(() => setUpdating(false))
    }   


 
    return (
        <div className="container">
            <ul className="breadcrumb">
                <li><Link to="/"><i className="fa fa-home"></i>&nbsp;Home</Link></li>
            </ul>

            <div className="row">

                <div className="table-responsive col-md-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td className="text-center">Image</td>
                                <td className="text-left">Product Name</td>
                                <td className="text-left">Quantity</td>
                                <td className="text-right">Unit Price</td>
                                <td className="text-right">Total</td>
                            </tr>
                        </thead>
                        {products.map((product,index)=>(
                            <tbody key={index}>
                                <tr>
                                    <td className="text-center"><Link to={`/product/${product._id}`}><img className="img-thumbnail" title="women's clothing" alt="women's clothing" src={`${apis.BASE_SERVER_URL}/${product.images[0]}`} width="100px" /></Link></td>
                                    
                                    <td className="text-left"><Link to={`/product/${product._id}`}>{product.name}</Link></td>
                        
                                    <td className="text-left"><div style={{maxWidth: "200px"}} className="input-group btn-block">

                                         <div className="d-flex w-100 justify-content-center mt-2">
                                            <input type="text" className="form-control quantity w-100" disabled={true} size="1" value={cartDetails[index].count} name="quantity" />

                                            {
                                                cartDetails[index].count === 1 ?
                                                ""
                                                :
                                                (<button  className="btn btn-danger mx-1" title="" data-toggle="tooltip" type="button" data-original-title="Remove"
                                                onClick={() => updateQty(cartDetails[index]._id,-1)}
                                                disabled={updating}
                                                >
                                                    <i className="fa fa-minus"></i>
                                                </button>)
                                                
                                                
                                            }
                                             

                                            <button className="btn btn-primary" title="" data-toggle="tooltip" type="button" data-original-title="Update"
                                            onClick={() => updateQty(cartDetails[index]._id, +1)}
                                            disabled={updating}
                                            >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                            
                                         </div>

                                         <div className="my-2 w-100">
                                         <button className="btn btn-danger w-100" title="" data-toggle="tooltip" type="button" data-original-title="Update"
                                            onClick={() => deleteItem(product._id)}
                                            disabled={updating}
                                            >
                                                <i className="fa fa-trash"></i>
                                                &nbsp;Delete Item
                                            </button>
                                         </div>
                                        </div>
                                    </td>
                                    <td className="text-right">₹{product.salePrice ? product.salePrice : product.regularPrice}</td>
                                    <td className="text-right">₹{product.salePrice ? product.salePrice * cartDetails[index].count : product.regularPrice * cartDetails[index].count}</td>
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

