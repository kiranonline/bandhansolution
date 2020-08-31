import React,{useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import Modal from 'react-modal';
import {connect} from 'react-redux';
import Account from './Account';
import { modal } from "../../actions/modalAction";
import krishi from "./static/images/krishi.jpeg";
import './NavbarHeader.css'


Modal.setAppElement('#root');
function NavbarHeader(props) {
  let history= useHistory();
  const [search_query,setSearchQuery] = useState("");
  let login_item=props.auth.isLoggedIn?{display:"none"}:{}
  let myaccount_item=props.auth.isLoggedIn?{}:{display:"none"}
  
  // console.log(history);
  const handleSearch = () => {
    history.push(`/products?search=${search_query}`);
  }

    return (
      <div>
        
        {/* <Modal 
          contentClassName="Content"
          isOpen={props.modalisopen.loading}
          onRequestClose={()=> props.modal(false)}
          style={{
            overlay:{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              zIndex:1000
            },
            content:{
              top: "10%",
              bottom: "10%",
              right: "27%",
              left:"22%",
              overflow: 'hidden',
              padding: '0px',
              background: "transparent",
              border: '0px solid #ccc',
            }
          }}
        >
        {props.modalisopen.loading?"dblock":"dnone"}
        {props.modalisopen.loading?"dnone":"dblock"}
          <Account />
        </Modal> */}

        <div id="simpleModal" className={`account-modal ${props.modalisopen.loading?"dblock":"dnone"}`}>
          <div className="account-modal-content">
            <span className="closeBtn" onClick={()=> props.modal(false)}>&times;</span>
            {/* <p>Hello I am a modal</p> */}
            <Account />
          </div>
        </div>

        <nav id="menu" className="navbar">
            <div className="nav-inner container">
              <div className="navbar-header"><span id="category" className="visible-xs">Categories</span>
                <button type="button" className="btn btn-navbar navbar-toggle" ><i className="fa fa-bars"></i></button>
              </div>
              <div className="navbar-collapse">
                <ul className="main-navigation">
                  <li><a href="#"   className="parent"  >Home</a> </li>
                  <li className="search-box">
                        <input placeholder="search.." type="text" name="search_query" onChange={(e)=> setSearchQuery(e.target.value)}/>
                        <button onClick={handleSearch}><i className="fa fa-search"></i></button>
                  </li>
                  <li style={login_item}><a href="#"   className="parent"  onClick={()=>props.modal(true)}>Login</a> </li>
                  <li style={myaccount_item}><a href="#"   className="parent"  >My Account</a> </li>
                  <li><a href="#"   className="parent"  >Cart</a> </li>
                  <li className="language">
                    <form action="#" encType="multipart/form-data" id="language">
                      <div className="btn-group">
                        <select name="language" id="language-selection">
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="telgu">Telgu</option>
                        </select>
                      </div>
                    </form>
                  </li>
                  
                </ul>
              </div>
            </div>
        </nav>
      </div>
    )
}

const mapStateToProps = (state) => ({
  modalisopen:state.Modal,
  auth: state.Auth
});

export default connect(mapStateToProps, {
  modal
})(NavbarHeader);
