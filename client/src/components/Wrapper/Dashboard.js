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

    let toggleSideBar = ()=>{
        setSideBarCollapsed(!sideBarCollapsed);
    }

    useEffect(() => {
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
        })
    }, [])

    let updateFormField = (e) => {
        e.persist();
    
        setUserD(oldState => ({...oldState, [e.target.name]: e.target.value}))
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

                                <div className="row mb-2">
                                    <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="defaultAddress">Default Address</label>
                                    <input type="text" className="col-9 form-control" id="defaultAddress" name="defaultAddress" value={userD.defaultAddress ? userD.defaultAddress : ""} onChange={(e) => updateFormField(e)} placeholder="Set your address for quick ordering"/>
                                </div>

                                <div className="row mb-1">
                                    <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="email">Email</label>
                                    <input type="email" className="col-9 form-control" id="email" name="email" value={userD.email ? userD.email : ""} onChange={(e) => updateFormField(e)}/>
                                </div>

                                <div className="row mb-1">
                                    <label className="col-3 m-0 font-weight-bold align-self-center text-dark" htmlFor="phoneNumber">Phone Number</label>
                                    <input type="number" typeof="number" className="col-9 form-control" id="phoneNumber" name="phoneNumber" value={userD.phoneNumber ? userD.phoneNumber : ""} onChange={(e) => updateFormField(e)}/>
                                </div>

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




