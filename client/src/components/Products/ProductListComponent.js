import React,{useEffect, useState} from 'react';
import {connect} from "react-redux";
import { Link,useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import {fetchProducts} from "../../actions/productListAction";
import NewProduct from "../Homepage/ProductCard";
import CategorySelector from '../GlobalComponents/CategorySelector';


function ProductComponent(props) {
    let params=useParams();
    console.log(params);
    
    let [productList,setProductList] = useState([]);
    let [isList, setIsList] = useState(true);
    let [sortby, setSortBy] = useState("");

    const sort = (e) => {
        setSortBy(e.target.value);
        
        let URL = apis.GET_PRODUCT_LIST + window.location.search;
        URL = URL + `&sortType=${e.target.value}`  

        http.get(URL).then((result)=>{
          console.log("res",result);
          if(result.data.status){
              setProductList(result.data.data)
              props.fetchProducts(result.data.data)
          }else{
              console.log(result.data.message);
          }
        })
        .catch((err)=>{
          console.log(err);
        })

    }

    let activeStyle = {
        color: "orange"
    }

    const fetchProducts = (data)=>{
        // let api = {}

        let URL = apis.GET_PRODUCT_LIST;

        // let qs = queryString.parse(window.location.search)
        // console.log(qs);

        // if(qs.category){
        //     setCategoryId(qs.category)
        // }

        URL = URL + window.location.search  

        http.get(URL).then((result)=>{
          console.log("res",result);
          if(result.data.status){
              setProductList(result.data.data)
              props.fetchProducts(result.data.data)
          }else{
              console.log(result.data.message);
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    
      useEffect(()=>{
        fetchProducts();
      },[])


    return (
        <div className="container">
            <ul className="breadcrumb">
                {/* <li><Link to="/home"><i className="fa fa-home"></i></Link></li> */}
                <li>All Products</li>
            </ul>

            <div className="row">

                <CategorySelector />

                <div id="content" className="col-md-9">
                {/* <h2 className="category-title">Desktops</h2>
                <div className="row category-banner">
                    <div className="col-sm-12 category-image"><img src="image/banners/category-banner.jpg" alt="Desktops" title="Desktops" className="img-thumbnail" /></div>
                    <div className="col-sm-12 category-desc">Lorem ipsum dolomagna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</div>
                </div> */}
                <div className="category-page-wrapper d-flex align-items-center">

                    

                    <div className="d-flex align-items-center ml-1 mr-0">
                        <div className="btn-group btn-list-grid mr-0">
                            <button type="button" id="list-view" className="btn btn-default list" title="List"
                            onClick={() => setIsList(true)}
                            >
                                <i className="fa fa-th-list" style={isList ? activeStyle : {}}></i>
                            </button>
                            <button type="button" id="grid-view" className="btn btn-default grid" title="Grid" onClick={() => setIsList(false)}>
                                <i className="fa fa-th" style={!isList ? activeStyle : {}}></i>
                            </button>
                        </div>
                        {/* <a href="#" id="compare-total" className="p-0 m-0">Product Compare (0)</a>  */}
                    </div>
                    {/* <div className="col-md-1 text-right page-wrapper">
                        <label className="control-label">Show :</label>
                        <div className="limit">
                            <select id="input-limit" className="form-control">
                            <option  selected="selected">8</option>
                            <option >25</option>
                            <option >50</option>
                            <option >75</option>
                            <option >100</option>
                            </select>
                        </div>
                    </div> */}
                    <div className="d-flex ml-auto">
                        <label className="control-label">Sort By :</label>
                        <div className="sort-inner">
                            <select value={sortby} id="input-sort" className="form-control"
                            onChange = {(e) => sort(e)}
                            >
                                <option value="">Default</option>
                                <option value="hightolowprice">Price (Low &gt; High)</option>
                                <option value="lowtohighprice">Price (High &gt; Low)</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Newest Last</option>
                                <option value="maxsold">Maximum Sold</option>
                                <option value="minsold">Minimum Sold</option>

                            </select>
                        </div>
                    </div>
                </div>
                <br />

                {isList ? 
                    (<div className="grid-list-wrapper">

                        {productList.map(product => 
                            
                            <div className="product-thumb row my-5" key={product._id}>
                                <div className="image product-imageblock col-3"> 
                                    <img src={`${apis.BASE_SERVER_URL}/${product.images[0]}`} alt={product.name} title={product.name} width="200px" style={{minWidth: "200px"}} /> 
                                    {/* <button type="button" className="addtocart-btn btn btn-primary" >Add To Cart</button> */}
                                </div>
                                <div className="caption product-detail col-8 offset-1 d-flex flex-column justify-content-center">
                                    <h2 className="h4"> <Link to={`/product/${product._id}`} title="lorem ippsum dolor dummy"> {product.name} </Link> </h2>
                                    <p className="product-desc"> 
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere rem, doloribus placeat aliquam sint quo nostrum magnam odio distinctio ullam non architecto error ducimus vero molestiae praesentium illo eaque nisi!
                                    </p>
                                    

                                    <h2 className="productpage-price">Price:&nbsp;
                                        {product.salePrice ? (
                                            <>
                                            <span className='strikethrough text-danger'>Rs.{product.regularPrice}</span>&nbsp;
                                            <span className="h4">Rs.{product.salePrice}</span>
                                            </>
                                        ) : `Rs. ${product.regularPrice}`
                                        || <Skeleton />
                                        }
                                    </h2>

                                    {/* <div className="rating"> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star fa-stack-2x"></i><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-2x"></i></span> </div> */}
                                        
                                    <Link to={`/product/${product._id}`} type="button" className="btn btn-warning mt-2 w-25">Add to Cart</Link>
                                    
                                </div>
                            </div>

                        )}

                   
                    </div>)

                    : 

                    (
                        <div className="mt-2">
                            <h2 className="h2 mb-3">New Arrivals</h2>
                            <div className="d-flex align-items-start justify-content-start flex-wrap">
                                {
                                productList
                                    .map(product => <NewProduct key={product.id} product={product} />)
                                }
                            </div>
                        </div>
                    )
            
                }
                
                <div className="category-page-wrapper">
                    <div className="result-inner">Showing 1 to 8 of 10 (2 Pages)</div>
                    <div className="pagination-inner">
                    <ul className="pagination">
                        <li className="active"><span>1</span></li>
                        <li><a href="category.html">2</a></li>
                        <li><a href="category.html">&gt;</a></li>
                        <li><a href="category.html">&gt;|</a></li>
                    </ul>
                    </div>
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
  })(ProductComponent);
