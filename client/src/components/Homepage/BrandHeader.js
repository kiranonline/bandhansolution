import React,{useState} from 'react';
import {Link, Redirect, useHistory} from "react-router-dom";
import {connect} from "react-redux"
import logo from './static/images/logo.png'
import {modal} from "../../actions/modalAction";
import {cartQuantity} from "../../actions/cartAction";

function BrandHeader(props) {
    const [cartIsOpen,setcartIsOpen] = useState(false);
    let history = useHistory()

    const handleCart = ()=>{
        history.push("/cart")
        console.log(props.Auth.isLoggedIn);
        if(!props.Auth.isLoggedIn){
            props.modal(true);
        }
    }
    console.log(props.cartItems);
    
    return (
        <div className="container p-3 w-100 d-flex justify-content-between align-items-center">
            
            <a id="logo" className="d-block" href="#">
                <img src={logo} title="E-Commerce" alt="E-Commerce" className="img-responsive" />
            </a> 
    
            <div className="header-right p-0">
                <div id="cart" className="btn-group btn-block p-0">
                    <button type="button" onClick={()=> handleCart()} className="btn btn-inverse btn-block btn-lg dropdown-toggle cart-dropdown-button"> <span id="cart-total"><span className="cart-title">Shopping Cart</span><br/>
                    <span className="count">
                    {props.cartItems.count} item(s)    
                    </span>
                    </span><Link to="/cart"/> </button>
                </div>
            </div>
        </div>
    )
}
 
const mapStateToProps= (state) => ({
    categories: state.FetchCategories,
    Auth: state.Auth,
    modalLoading: state.Modal,
    cartItems: state.CartQuantity
})

export default connect(mapStateToProps, {
    modal,
    cartQuantity,
})(BrandHeader);