import React,{useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux"
import logo from './static/images/logo.png'
import {modal} from "../../actions/modalAction";
import {cartQuantity} from "../../actions/cartAction";

function BrandHeader(props) {
    const [cartIsOpen,setcartIsOpen] = useState(false);

    const handleCart = ()=>{
        console.log(props.Auth.isLoggedIn);
        if(!props.Auth.isLoggedIn){
            props.modal(true);
        }
    }
    console.log(props.cartItems);
    
    return (
        <div className="container">
            <div className="header-inner">
                <div className="col-sm-4 col-xs-12 header-middle">
                    <div className="header-middle-top">
                    <div id="logo">
                        <a href="#">
                            <img src={logo} title="E-Commerce" alt="E-Commerce" className="img-responsive" />
                        </a> 
                    </div>
                    </div>
                </div>
                <div className="col-sm-4 col-xs-12 header-right">
                    <div id="cart" className="btn-group btn-block">
                        <button type="button" onClick={()=> handleCart()} className="btn btn-inverse btn-block btn-lg dropdown-toggle cart-dropdown-button"> <span id="cart-total"><span className="cart-title">Shopping Cart</span><br/>
                        {props.cartItems.count} item(s)</span><Link to="/cart"/> </button>
                    </div>
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