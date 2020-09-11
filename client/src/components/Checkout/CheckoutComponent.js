import React from 'react';
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import CategorySelector from '../GlobalComponents/CategorySelector';

function CheckoutComponent(props) {
    return (
        <div className="container">
            <ul className="breadcrumb">
                <li><Link to="/"><i className="fa fa-home">Home</i></Link></li>
            </ul>
            
            <CategorySelector />
            
        </div>
    )
}

const mapStateToProps= (state) => ({
    categories: state.FetchCategories,
    Auth: state.Auth,
    modalLoading: state.Modal
})

export default connect(mapStateToProps, {
})(CheckoutComponent);
