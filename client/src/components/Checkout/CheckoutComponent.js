import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import { setUserDetails } from "../../actions/authAction";
import CategorySelector from '../GlobalComponents/CategorySelector';
import http from "../../services/httpCall";
import apis from "../../services/apis";
 

function CheckoutComponent(props) {

    const [orderPlaceable, isOrderPlaceable] = useState(false);

    const [defaultAddressId, setDefaultAddressId] = useState({});

    const [defaultChange, setDefaultChange] = useState(false);
    const [addresses, setAddresses] = useState([]);

    const [cartDetails,setcartDetails] = useState([]);
    const [cart_id, setCartId] = useState("");
    const [products, setProducts] = useState([]);
    const [updating, setUpdating] = useState(false);

    const [statusList, setStatusList] = useState([]);

    const [total, setTotal] = useState(0);

    const getUserAddresses = () => {
        http.get(apis.GET_ADDRESS_LIST).then((result) => {
            console.log(result.data.data);
            if(result.data.status){
                
                result.data.data.forEach(address => {
                    if(address.isdefault){
                        console.log(address._id)
                        setDefaultAddressId(address._id);
                    }
                })

                setAddresses(result.data.data)
            }
            else{
                console.log("Error Occoured", result.data.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchCart = ()=>{
        //fetch cart details of logged in user.
        http.get(apis.FETCH_THE_CART).then((result)=>{
            // console.log(result);
            if(result.data.status){
                
                setCartId(result.data.data._id)

                setcartDetails(result.data.data.cart);
                console.log(result.data.data.cart);
                setProducts(result.data.data.product_details);

                
            }else{
                console.log(result.data.message);
                //Handle the error message.
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(() => {
        getUserAddresses();
        fetchCart();
    }, [])


    useEffect(() => {
        let totalCost = 0;

        cartDetails.forEach((item, index) => {
            if(products && products[index]){
                totalCost += products[index].salePrice ?  products[index].salePrice * item.count : products[index].regularPrice * item.count; 
            }
        })

        setTotal(totalCost);
    },[cartDetails, products])

    useEffect(() => {
        let status = [];
        let flag = 0;
        cartDetails.forEach(e => {
            http.post(apis.AVAILABLE_FOR_CART, {product_id: e.product})
                .then(res => {
                    if(res.data.status){
                        status.push(true)
                    }
                    else{
                        status.push(false)
                        flag = 0;
                    }
                })
                .catch(err => {
                    console.log(err);
                    status.push(false);
                })
                .finally(() => {
                    setStatusList(status);
                    if(flag === 1) isOrderPlaceable(false)
                    else isOrderPlaceable(true)
                })
        })
    }, [cartDetails])

    const handleDefaultAddressChange = (e) => {
        console.log(e.target.value);
        setDefaultAddressId(e.target.value)
    }


    const getUserDetails = () => {
        http.get(apis.GET_USER_DETAILS).then((result)=>{
            console.log(result.data.data);
            if(result.data.status){
              props.setUserDetails(result.data.data);
            }
            else{
                console.log("Error happened");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    const changeDefaultAddress = (e) => {
        setDefaultChange(false)
        http.post(apis.SET_DEFAULT_ADDRESS, {address_id: defaultAddressId})
            .then(res => {
                console.log(res.data);
                if(res.data.status === true){
                    getUserDetails();
                    getUserAddresses();
                    setDefaultChange(true)
                    setTimeout(() => {setDefaultChange(false)},3000)
                }
            })
            .catch(err => {
                console.log(err);
            })
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
                <li><Link to="/"><i className="fa fa-home">Home</i></Link></li>
            </ul>
            
            <div className="row">

                <CategorySelector />
            
                <div className="col-md-9 col-12">
                    <h1 className="h2">
                        Checkout
                    </h1>
                    
                    {
                        !orderPlaceable ? 
                        
                        <div className="alert alert-danger" role="alert">
                            One or more products are not available in your area(Marked with yellow backgroud). Please delete them form <Link to="/cart">cart</Link> to proceed.
                        </div>

                        :
                        
                        ""

                    }
                    

                    <div className="address-form">
                        <label className="text-dark font-weight-bold" htmlFor="defaultAddress" value={defaultAddressId}>Select delivery Address</label>

                        {
                            defaultChange ? 
                            
                            <div className="alert alert-success" role="alert">
                                Default address changed
                            </div>

                            :
                            
                            ""

                        }
                    

                        <select className="custom-select mr-sm-2" id="defaultAddress" onChange={(e) => handleDefaultAddressChange(e)}>
                            <option value="" hidden>
                                Nothing Available
                            </option>
                            
                            {
                                addresses.map(e => 
                                    <option value={e._id} key={e._id} selected={e.isdefault}>
                                        {e.lineone}, {e.city} - {e.pincode}
                                    </option>
                                )
                            }
                            
                        </select>

                        <button onClick={() => changeDefaultAddress()} className="btn btn-primary w-100 my-1">
                            Change Delivery Address
                        </button>

                        <p className="mb-0"><span className="text-danger">*</span>Please note, setting it as a delivery address will make this address your default, which you can change from <Link to="/profile">profile</Link> page</p>
                    </div>
                    

                    <div className="my-2">
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
                            <tbody>
                            {products.map((product,index)=>(
                                <tr key={index} className={statusList[index] ? "" : "bg-warning" }>
                                    <td className="text-center"><Link to={`/product/${product._id}`}><img className="img-thumbnail" title="women's clothing" alt="women's clothing" src={`${apis.BASE_SERVER_URL}/${product.images[0]}`} width="100px" /></Link></td>
                                    
                                    <td className="text-left"><Link to={`/product/${product._id}`}>{product.name}</Link></td>
                        
                                    <td className="text-left">
                                        <div className="input-group btn-block">

                                        <input type="text" className="form-control quantity w-100" disabled={true} size="1" value={cartDetails[index].count} name="quantity" />

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
                            ))}
                                <tr>
                                    <td className="text-right" colSpan="4">Total Cost:</td>
                                    

                                    <td className="text-right">₹{total}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                
                    <div className="my-2">
                        
                        <p className="my-2">Estimated delivery date is 16/09/2020</p>

                        <button className="btn btn-primary d-block w-50 ml-auto" disabled={!orderPlaceable}>Place order</button>
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
    setUserDetails
})(CheckoutComponent);
