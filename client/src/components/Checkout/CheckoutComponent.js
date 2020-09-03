import React from 'react';
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom"
import {connect} from "react-redux"

function CheckoutComponent(props) {
    return (
        <div className="container">
            <ul className="breadcrumb">
                <li><Link to="/"><i className="fa fa-home"></i></Link></li>
            </ul>
            <div id="column-left" className="col-sm-3 hidden-xs column-left">
                <div className="column-block">
                    <div className="column-block">
                    <div className="columnblock-title">Categories</div>
                        <div className="category_block">
                            <ul className="box-category treeview-list treeview">
                                {props.categories.category_list.length===0?
                                    <Skeleton count={5} />
                                :
                                    props.categories.category_list.map((data)=>(
                                        <li key={data._id}><Link to="#">{data.name}</Link></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
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
})(CheckoutComponent);
