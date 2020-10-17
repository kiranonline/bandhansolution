import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Skeleton from 'react-loading-skeleton';
import queryString from 'query-string'
import {fetchProducts} from "../../actions/productListAction";

function CategorySelector(props) {

    let [categoryId,setCategoryId] = useState("");

    let activeStyle = {
        color: "orange",
        fontWeight: "bold"
    }

    useEffect(() => {
        
        let qs = queryString.parse(window.location.search)
        console.log(qs);

        if(qs.category){
            setCategoryId(qs.category)
        }
    }, [])

    return (
        <div id="column-left" className="col-lg-3 col-12 hidden-xs column-left">
            <div className="column-block">
                <div className="column-block">
                    <div className="columnblock-title">
                        Categories
                    </div>
                    <div className="category_block">
                        <ul className="box-category treeview-list treeview">

                            <li>
                                <a style={categoryId === "" ?  activeStyle : {}} href={`/products`}>
                                    All
                                </a>
                            </li>

                            {props.category_list.category_list.length===0?
                                <Skeleton count={7} />
                            :
                                props.category_list.category_list.map((data)=>(
                                    
                                    <li key={data._id}>
                                        <a style={data._id === categoryId ?  activeStyle : {}} href={`/products/?category=${data._id}`}>
                                            {data.name}
                                        </a>
                                    </li>
                                    
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    category_list: state.FetchCategories
  });

export default connect(mapStateToProps, {
    fetchProducts
})(CategorySelector)
