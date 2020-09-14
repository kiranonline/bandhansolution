import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { setUserDetails } from "../../actions/authAction";
import apis from "../../services/apis";
import http from "../../services/httpCall";
// import { Layout,Row,Col } from 'antd';
// import { useLocation, Switch, Route } from "react-router-dom";



function Dashboard(props) {
    const [sideBarCollapsed,setSideBarCollapsed] = useState(false);
    const [userD, setUserD] = useState({})

    const tabbedPages = ["My Account","Addresses" , "My Order History"]
    const [currentActiveTab, setCurrentActiveTab] = useState(0);

    const [localDefaultAddress, setLocalDefaultAddress] = useState({
        _id: "",
        lineone: "",
        locality: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
    })

    const [errors, setErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false)

    let toggleSideBar = ()=>{
        setSideBarCollapsed(!sideBarCollapsed);
    }

    useEffect(() => {
        http.get(apis.GET_USER_DETAILS).then((result)=>{
            console.log(result.data.data);
            if(result.data.status){
              props.setUserDetails(result.data.data);
              setUserD(result.data.data)
              if( result.data.data.defaultAddress  && result.data.data.defaultAddress !== {}){
                let dAddress = result.data.data.defaultAddress
                let temp = {
                    _id: dAddress._id ? dAddress._id : "",
                    lineone: dAddress.lineone ? dAddress.lineone : "",
                    locality: dAddress.locality ? dAddress.locality : "",
                    city: dAddress.city ? dAddress.city : "",
                    district: dAddress.district ? dAddress.district : "",
                    state: dAddress.district ? dAddress.district : "",
                    country: dAddress.country ? dAddress.country : "",
                    pincode: dAddress.pincode ? dAddress.lineone : "",
                }
                setLocalDefaultAddress(temp);
              }
            }
            else{
                console.log("Error happened");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }, [])

    let updateFormField = (e) => {
        e.persist();
    
        setUserD(oldState => ({...oldState, [e.target.name]: e.target.value}))
    }

    let updateAddressField = (e) => {
        e.persist();
    
        setLocalDefaultAddress(oldState => ({...oldState, }))
    }

    let changePassword = () => {

        setPasswordErrors([]);

        if(currentPassword.length < 5){
            setPasswordErrors(old => [...old, "Password Length must be >= 5"])
            return
        }

        if(newPassword.length < 5){
            setPasswordErrors(old => [...old, "Repeat Password Length must be >= 5"])
            return
        }

        if(newPassword === currentPassword){
            setPasswordErrors(old => [...old, "Old and new password can not be the same"])
            return
        }

        http.post(apis.UPDATE_PASSWORD, 
            {
                oldPassword: currentPassword,
                newPassword: newPassword 
            }
        ).then(res => {
            if(res.data.status === false) setPasswordErrors(old => [...old, res.data.message])
            else{
                setCurrentPassword("");
                setNewPassword("");
                setPasswordUpdateSuccess(true);
                setTimeout(() => setPasswordUpdateSuccess(false), 5000);
            }
        }).catch(err => {
            console.log(err);
            setPasswordErrors(old => [...old, "Password Update Failed!"])
        })
    }

    return (
        <div className="container mt-2">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/"><i className="fa fa-home"></i>Home</a></li>
                <li className="breadcrumb-item active">Account</li>
            </ol>


            <div className="row">
                <div className="col-md-3 col-12">
                    <div className="column-block">
                        <div className="column-block">
                            <div className="columnblock-title text-white" style={{backgroundColor: "#ef8829", fontSize: "18px", padding: "13px 20px 11px"}}>
                                ACCOUNT
                            </div>
                            <div className="category_block">
                                <ul className="box-category treeview-list treeview">
                                    {
                                        tabbedPages.map((data, index)=>(
                                            <div key={data}>
                                            <li>
                                                <a href="#" className={index === currentActiveTab ? "active" : ""}
                                                onClick={() => setCurrentActiveTab(index)}
                                                >
                                                    {data}
                                                </a>
                                            </li>
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>              
                </div>
            
                <div className="col-md-9 col-12">

                    {currentActiveTab === 0 ? 
                        (
                            <>
                            <h3 className="h3">Profile</h3>
                            {/* {
                                errors.length > 0 ? "Errors there" : "No error"
                            } */}
                            {
                                errors.map((e,i) => (
                                    <div key={i} className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {e}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setErrors(old => old = old.filter(i => i !== e))}>
                                            <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                ))
                            }
                            
                            <div className="ml-3 w-100">
                                <div className="row my-2 mb-4">
                                    <div className="col-3">
                                        <img src={`${apis.BASE_SERVER_URL}${userD.avatar}`} alt="Avatar" style={{width: "100px", borderRadius: "50%"}}/>
                                    </div>
                                    <div className="col-9 align-self-center p-0">
                                        <button className="btn btn-primary m-0">Change Profile Image</button>
                                    </div>
                                </div>

                                <div className="row mb-1">
                                    <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="name">Name</label>
                                    <input type="text" className="col-9 form-control" id="name" name="name" value={userD.name ? userD.name : ""} onChange={(e) => updateFormField(e)}/>
                                </div>

                                <div className="row mb-1">
                                    <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="email">Email</label>
                                    <input type="email" className="col-9 form-control" id="email" name="email" value={userD.email ? userD.email : ""} onChange={(e) => updateFormField(e)}/>
                                </div>

                                <div className="row mb-1">
                                    <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="phoneNumber">Phone Number</label>
                                    <input type="number" typeof="number" className="col-9 form-control" id="phoneNumber" name="phoneNumber" value={userD.phoneNumber ? userD.phoneNumber : ""} onChange={(e) => updateFormField(e)}/>
                                </div>

                                <button className="btn btn-secondary mt-2 ml-auto" >Save Changes</button>

                                <hr/>

                                <div className="passwordBlock my-3">
                                    <h3 className="h4 mb-2">Change Password</h3>

                                    {passwordUpdateSuccess ? 
                                        (
                                            <div className="alert alert-success" role="alert">
                                                Password Update Successful
                                            </div>
                                        )
                                        :
                                        ""
                                    }

                                    {
                                        passwordErrors.map((e,i) => (
                                            <div key={i} className="alert alert-danger alert-dismissible fade show" role="alert">
                                                {e}
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setPasswordErrors(old => old = old.filter(i => i !== e))}>
                                                    <span aria-hidden="true">&times;</span>
                                            </button>
                                            </div>
                                        ))
                                    }

                                    <div className="row mb-2">
                                        <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="currentPassword">Current Password</label>
                                        <input type="password" className="col-9 form-control" id="currentPassword" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Password"/>
                                    </div>

                                    <div className="row mb-2">
                                        <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="newPassword">New Password</label>
                                        <input type="password" className="col-9 form-control" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Re enter Password"/>
                                    </div>

                                    <button onClick={() => changePassword()} className="btn btn-secondary">
                                        Update Password
                                    </button>

                                </div>

                                <hr/>

                                <div className="addressBlock my-3">
                                    <h3 className="h4">Default Address</h3>

                                    <div className="row mb-2">
                                        <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="lineone">Address Line</label>
                                        <input type="text" className="col-9 form-control" id="lineone" name="lineone" value={localDefaultAddress.lineone} onChange={(e) => updateAddressField(e)} placeholder="Set your address for quick ordering"/>
                                    </div>


                                    <div className="row mb-2">
                                        <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="pincode">Pincode</label>
                                        <input type="text" className="col-9 form-control" id="pincode" name="pincode" value={localDefaultAddress.pincode} onChange={(e) => updateAddressField(e)} placeholder="Set your address for quick ordering"/>
                                    </div>

                                    <div className="row mb-2">
                                        <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="locality">Locality</label>
                                        <input type="text" className="col-9 form-control" id="locality" name="locality" value={localDefaultAddress.locality} onChange={(e) => updateAddressField(e)} placeholder="A landmark near your place, e.g. Water Tank"/>
                                    </div>

                                    <div className="row mb-2">
                                        <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="city">City</label>
                                        <input type="text" className="col-9 form-control" id="city" name="city" value={localDefaultAddress.city} onChange={(e) => updateAddressField(e)} placeholder="Enter your city"/>
                                    </div>

                                    <div className="row mb-2">
                                        <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="state">State</label>
                                        <input type="text" className="col-9 form-control" id="state" name="state" value={localDefaultAddress.state} onChange={(e) => updateAddressField(e)} placeholder="State"/>
                                    </div>

                                    <div className="row mb-2">
                                        <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="country">Country</label>
                                        <input type="text" className="col-9 form-control" id="country" name="country" value={localDefaultAddress.country} onChange={(e) => updateAddressField(e)} placeholder="Country"/>
                                    </div>
                                </div>

                                <hr/>


                                

                                <button className="btn btn-secondary mt-2 ml-auto">Save Changes</button>
                            </div>
                            </>
                        ) 
                        : 
                        (<></>)
                    }

                    {currentActiveTab === 1 ? 
                        (
                            <>
                                <h3 className="h3">Addresses</h3>
                            </>
                        ) 
                        : 
                        (<></>)
                    }

                    {currentActiveTab === 2 ? 
                        (
                            <>
                                <h3 className="h3">Order History</h3>
                            </>
                        ) 
                        : 
                        (<></>)
                    }
                    
                </div>
            </div>
        </div>    
    )
    
}


const mapStateToProps = (state) => ({
    Auth: state.Auth
});
export default connect(mapStateToProps, { 
    setUserDetails
})(Dashboard);




