import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { setUserDetails } from "../../actions/authAction";
import apis from "../../services/apis";
import http from "../../services/httpCall";
// import { Layout,Row,Col } from 'antd';
// import { useLocation, Switch, Route } from "react-router-dom";



function Dashboard(props) {
    // const [sideBarCollapsed,setSideBarCollapsed] = useState(false);
    const tabbedPages = ["My Account","Addresses" , "My Order History"]
    const [currentActiveTab, setCurrentActiveTab] = useState(0);

    const [errors, setErrors] = useState([]);
    const [userD, setUserD] = useState({})    

    const [newAddress, setnewAddress] = useState({
        _id: "",
        lineone: "",
        locality: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
    })

    const [addresses, setAddresses] = useState([]);

    const [addressErrors, setAddressErrors] = useState([]);

    

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false)
    const [passwordErrors, setPasswordErrors] = useState([]);

    const [newProfilPicture, setNewProfilePicture] = useState({});

    const uploadAvatar = () => {

        const formData = new FormData();
        formData.append('avatar',newProfilPicture)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        http.post(apis.UPLOAD_USER_AVATAR, formData, config)
            .then(res => {
                console.log(res);
                if(res.data.status){
                   http.post(apis.USER_UPDATE_PROFILE_PIC, {avatar: res.data.file}).then(res => {
                       if(res.data.status){
                           getUserDetails();
                       }
                   }).catch(err => {
                       console.log(err);
                   })
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setNewProfilePicture({});
            })

    }
    // let toggleSideBar = ()=>{
    //     setSideBarCollapsed(!sideBarCollapsed);
    // }

    const getUserDetails = () => {
        http.get(apis.GET_USER_DETAILS).then((result)=>{
            console.log(result.data.data);
            if(result.data.status){
              props.setUserDetails(result.data.data);
              setUserD(result.data.data)
            }
            else{
                console.log("Error happened");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    const getUserAddresses = () => {
        http.get(apis.GET_ADDRESS_LIST).then((result) => {
            console.log(result.data.data);
            if(result.data.status){
                setAddresses(result.data.data)
            }
            else{
                console.log("Error Occoured", result.data.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {

        getUserDetails();
        getUserAddresses();

    }, [])

    const updateFormField = (e) => {
        e.persist();
        setUserD(oldState => ({...oldState, [e.target.name]: e.target.value}))
    }

    const updateAddressField = (e) => {
        e.persist();
        setnewAddress(oldState => ({...oldState, [e.target.name]: e.target.value}))
    }

    const changePassword = () => {

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


    const resetNewAddress = () => {
        setnewAddress({
            _id: "",
            lineone: "",
            locality: "",
            city: "",
            district: "",
            state: "",
            country: "",
            pincode: "",
        })
    }

    const addNewAddress = () => {
        setAddressErrors([]);
        
        let errors = 0;

        if(newAddress.lineone === "") {
            setAddressErrors(old => [...old, "Address Line required"])
            errors += 1;
        }
        

        if(newAddress.pincode === "") {
            setAddressErrors(old => [...old, "Pincode required"])
            errors += 1
        }
        

        if(newAddress.pincode.length != 6) {
            setAddressErrors(old => [...old, "Invalid Pincode"])
            errors += 1
        }

        if(newAddress.locality === "") {
            setAddressErrors(old => [...old, "Locality Required"])
            errors += 1;
        }

        if(newAddress.city === "") {
            setAddressErrors(old => [...old, "City Required"])
            errors += 1;
        }

        if(newAddress.state === "") {
            setAddressErrors(old => [...old, "State Required"])
            errors += 1;
        }


        if(newAddress.country === "") {
            setAddressErrors(old => [...old, "Country Required"])
            errors += 1
        }
        

        if(errors > 0) return


        // {
        //     lineone: newAddress.lineone,
        //     locality: newAddress.locality,
        //     city: newAddress.city,
        //     pincode: newAddress.pincode,
        //     district: newAddress.district,
        //     country: newAddress.country
        // }

        console.log(newAddress)

        if(newAddress._id !== ""){

            setAddresses(old => old.filter(e => e._id !== newAddress._id))

            let address  = {...newAddress, address_id: newAddress._id}

            http.post(apis.EDIT_ADDRESS, address).then(res => {
                console.log(res.data);
                if(!res.data.status){
                    setAddressErrors(old => [...old, res.data.message])
                } 
                else{
                    setAddresses(old => [...old, res.data.data]);

                    resetNewAddress();
                }
            })
            .catch(err => {
                console.log(err);
                setAddressErrors(old => [...old, "Something Went wrong"])
            })
        }
        else{
            http.post(apis.ADD_NEW_ADDRESS, newAddress)
                .then(res => {
                    console.log(res.data);
                    if(!res.data.status){
                        setAddressErrors(old => [...old, res.data.message])
                    } 
                    else{
                        setAddresses(old => [...old, res.data.data]);
                        if(userD.defaultAddress === null){
                            setDefaultAddress(res.data.data._id)
                        }
                        resetNewAddress();
                    }
                })
                .catch(err => {
                    console.log(err);
                    setAddressErrors(old => [...old, "Something Went wrong"])
                })
        }

        
    } 

    const setDefaultAddress = (id) => {
        
        http.post(apis.SET_DEFAULT_ADDRESS, {address_id: id})
            .then(res => {
                console.log(res.data);
                if(res.data.status === true){
                    getUserDetails();
                    getUserAddresses();
                }
            })
            .catch(err => {
                console.log(err);
            })
        
    }

    const removeAddress = (id) => {
        http.post(apis.REMOVE_ADDRESS, {address_id: id})
            .then(res => {
                console.log(res.data);
                if(res.data.status === true){
                    setAddresses(old => old.filter(e => e._id !== id))
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const startEditingAddress = (id) => {
        setnewAddress({...addresses.filter(e => e._id === id)[0]})
    }

    return (
        <div className="container mt-2">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/"><i className="fa fa-home"></i>Home</a></li>
                <li className="breadcrumb-item active">Account</li>
            </ol>


            <div className="row">
                <div className="col-md-4 col-12">
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
            
                <div className="col-md-8 col-12">

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
                            
                            <div className="mx-3 w-100">
                                <div className="row my-2 mb-4 w-100">
                                    <div className="col-md-4 col-12 justify-content-center align-items-center d-flex">
                                        <img className="d-block" src={`${apis.BASE_SERVER_URL}${userD.avatar}`} alt="Avatar" style={{width: "100px", height:"100px", borderRadius: "50%"}}/>
                                    </div>
                                    <div className="col-md-8 d-flex flex-column col-12 mt-2 mt-md-0 p-0">

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                                            onChange={(e) => {
                                                e.persist();
                                                setNewProfilePicture(e.target.files[0])
                                            }}/>
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                        </div>
                                    </div>
                                    
                                    {
                                        <div class="alert alert-primary" role="alert">
                                            Current File&nbsp; 
                                            <strong>
                                                {newProfilPicture.name ? newProfilPicture.name : "None"}
                                            </strong>
                                        </div>
                                    }

                                    <button className="btn btn-primary m-0" onClick={() => uploadAvatar()} disabled={newProfilPicture.name ? false : true}>Change Profile Image</button>
                                    </div>
                                </div>


                                

                                <div className="row mb-md-1 mb-2 w-100">
                                    <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="name">Name</label>
                                    <input type="text" className="col-12 col-md-8 form-control" id="name" name="name" value={userD.name ? userD.name : ""} onChange={(e) => updateFormField(e)} disabled/>
                                </div>

                                <div className="row mb-md-1 mb-2 w-100">
                                    <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="email">Email</label>
                                    <input type="email" className="col-12 col-md-8 form-control" id="email" name="email" value={userD.email ? userD.email : ""} onChange={(e) => updateFormField(e)} disabled/>
                                </div>

                                <div className="row mb-md-1 mb-2 w-100">
                                    <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="phoneNumber">Phone Number</label>
                                    <input type="number" typeof="number" className="col-12 col-md-8 form-control" id="phoneNumber" name="phoneNumber" value={userD.phoneNumber ? userD.phoneNumber : ""} onChange={(e) => updateFormField(e)} disabled/>
                                </div>

                                {/* <div className="row w-100">
                                    <div className="col-12 col-md-6 offset-md-6 p-0">
                                        <button className="btn btn-secondary mt-2 w-100" >Save Changes</button>
                                    </div>
                                </div> */}


                                <hr/>

                                <div className="passwordBlock my-3">
                                    
                                    <div className="row w-100 mb-2">

                                        <h3 className="h4">Change Password</h3>
                                    </div>
                                    

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

                                    <div className="row mb-md-1 mb-2 w-100">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="currentPassword">Current Password</label>
                                        <input type="password" className="col-12 col-md-8 form-control" id="currentPassword" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Password"/>
                                    </div>

                                    <div className="row mb-md-1 mb-2 w-100">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="newPassword">New Password</label>
                                        <input type="password" className="col-12 col-md-8 form-control" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Re enter Password"/>
                                    </div>


                                    <div className="row w-100">
                                        <div className="col-12 col-md-6 offset-md-6 p-0">
                                            <button onClick={() => changePassword()} className="btn btn-secondary mt-2 w-100">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>

                                </div>

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

                                <div className="addressBlock my-3">
                                    <h3 className="h4">
                                    {
                                        newAddress._id === "" ? "Add New" : "Edit Address"
                                    }

                                    </h3>

                                    

                                    <div className="row mb-md-1 mb-2 w-100 mx-auto mx-md-0">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="lineone">Address Line</label>
                                        <input type="text" className="col-12 col-md-8 form-control" id="lineone" name="lineone" value={newAddress.lineone} onChange={(e) => updateAddressField(e)} placeholder="Set your address for quick ordering"/>
                                    </div>


                                    <div className="row mb-md-1 mb-2 w-100 mx-auto mx-md-0">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="pincode">Pincode</label>
                                        <input type="text" className="col-12 col-md-8 form-control" id="pincode" name="pincode" value={newAddress.pincode} onChange={(e) => updateAddressField(e)} placeholder="Set your address for quick ordering"/>
                                    </div>

                                    <div className="row mb-md-1 mb-2 w-100 mx-auto mx-md-0">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="locality">Locality</label>
                                        <input type="text" className="col-12 col-md-8 form-control" id="locality" name="locality" value={newAddress.locality} onChange={(e) => updateAddressField(e)} placeholder="A landmark near your place, e.g. Water Tank"/>
                                    </div>

                                    <div className="row mb-md-1 mb-2 w-100 mx-auto mx-md-0">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="city">City</label>
                                        <input type="text" className="col-12 col-md-8 form-control" id="city" name="city" value={newAddress.city} onChange={(e) => updateAddressField(e)} placeholder="Enter your city"/>
                                    </div>

                                    <div className="row mb-md-1 mb-2 w-100 mx-auto mx-md-0">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="district">District</label>
                                        <input type="text" className="col-12 col-md-8 form-control w-100" id="State" name="district" value={newAddress.district} onChange={(e) => updateAddressField(e)} placeholder="State"/>
                                    </div>

                                    <div className="row mb-md-1 mb-2 w-100 mx-auto mx-md-0">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="state">State</label>
                                        <input type="text" className="col-12 col-md-8 form-control" id="state" name="state" value={newAddress.state} onChange={(e) => updateAddressField(e)} placeholder="State"/>
                                    </div>

                                    <div className="row mb-md-1 mb-2 w-100 mx-auto mx-md-0">
                                        <label className="col-md-4 col-12 px-md-3 p-0 m-0 mb-md-0 mb-1 font-weight-bold align-self-center text-dark" htmlFor="country">Country</label>
                                        <input type="text" className="col-12 col-md-8 form-control" id="country" name="country" value={newAddress.country} onChange={(e) => updateAddressField(e)} placeholder="Country"/>
                                    </div>
                                </div>


                                {
                                    addressErrors.map((e,i) => (
                                        <div key={i} className="alert alert-danger alert-dismissible fade show" role="alert">
                                            {e}
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAddressErrors(old => old = old.filter(i => i !== e))}>
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                    ))
                                }
                                
                                
                                <div className="row w-100 mx-auto">
                                    {
                                        newAddress._id !== "" ? 
                                        (
                                            <button className="btn btn-danger mt-2 mr-2 ml-auto d-inline-block" onClick={() => resetNewAddress()}>
                                                Cancel Edit
                                            </button>
                                        )
                                        :
                                        ""
                                    }

                                    <button className="btn btn-secondary mt-2 d-inline-block" onClick={() => addNewAddress()}>
                                    {
                                        newAddress._id === "" ? "Add New Address" : "Save Changes"
                                    }
                                    </button>
                                </div>



                                <hr/>

                                <h3 className="h3 mb-3">Address List</h3>
                                

                                {
                                    addresses.map(ad => {
                                        if(ad.isdefault){
                                            return(
                                            <div key={ad._id} className="mt-2 card p-2">

                                                <p className="text-danger mb-1">*Default Address can't be deleted</p>

                                                <p className="h5 mb-0 text-dark">
                                                    {ad.lineone}
                                                </p>

                                                <p className="mb-1">
                                                    {ad.locality}, {ad.city}, {ad.district}, {ad.state}, {ad.country} - {ad.pincode}
                                                </p>



                                                <button className="btn btn-secondary mb-2" onClick={
                                                () => startEditingAddress(ad._id)
                                                }>
                                                    Edit Address
                                                </button>

                                            </div>
                                        );
                                        }
                                    })
                                }
                                

                                {addresses.map(ad => {
                                    if(!ad.isdefault && ad._id !== newAddress._id)
                                    {
                                        return (
                                            <div key={ad._id} className="mt-2 card p-2">
                                                <p className="h5 mb-0 text-dark">
                                                    {ad.lineone}
                                                </p>

                                                <p className="mb-1">
                                                    {ad.city}, {ad.district}, {ad.state}, {ad.country} - {ad.pincode}
                                                </p>



                                                <button className="btn btn-secondary mb-2" onClick={
                                                () => startEditingAddress(ad._id)
                                                }>
                                                    Edit Address
                                                </button>

                                                
                                                <div className="row w-100 mx-auto">

                                                    <div className="col-6 p-0 pr-2">
                                                        <button className="btn btn-danger w-100" onClick={
                                                        () => removeAddress(ad._id)
                                                        }>
                                                            Delete Address
                                                        </button>
                                                    </div>

                                                    <div className="col-6 p-0 pl-2">
                                                        <button className="btn btn-success w-100" onClick={
                                                        () => setDefaultAddress(ad._id)
                                                        }>
                                                            Set as Default Address
                                                        </button>
                                                    </div>
                                                </div>
                                                    
                                            </div>  
                                        )
                                    }
                                })}
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




