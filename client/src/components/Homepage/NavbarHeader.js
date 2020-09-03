import React,{useState,useEffect} from 'react';
import {useHistory,Link} from "react-router-dom";
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
                  <li><Link to="/home"   className="parent"  >Home</Link> </li>
                  <li className="search-box">
                        <input placeholder="search.." type="text" name="search_query" onChange={(e)=> setSearchQuery(e.target.value)}/>
                        <button onClick={handleSearch}><i className="fa fa-search"></i></button>
                  </li>
                  <li style={login_item}><Link to="#"   className="parent"  onClick={()=>props.modal(true)}>Login</Link> </li>
                  <li style={myaccount_item}><Link to="/profile"   className="parent"  >My Account</Link> </li>
                  <li><Link to="/cart"   className="parent"  >Cart</Link> </li>
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
