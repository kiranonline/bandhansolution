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

        <nav id="menu" className="navbar navbar-expand-md py-3">
          <div className="container d-flex justify-content-between align-items-center flex-column flex-md-row">
            <div id="navbarSupportedContent">
              <ul className="d-flex">
                <li className="nav-item hoverable active">
                  <Link className="nav-link spc" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item hoverable">
                  <Link style={login_item} className="nav-link spc" to="#" onClick={()=>props.modal(true)}>Login</Link>
                </li>
                <li className="nav-item hoverable">
                  <Link style={myaccount_item} className="nav-link spc" to="/profile">Profile</Link>
                </li>
                <li className="nav-item mr-2">
                  <form className="d-md-none" action="#" encType="multipart/form-data" id="language">
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

            <div className="w-75 my-2 my-md-0 mr-3">
              <form className="d-flex justify-content-center align-items-center" onSubmit={() => handleSearch()}>
                <input className="form-control mr-sm-2 flex-grow-1" type="search" onChange={(e)=> setSearchQuery(e.target.value)} placeholder="Search" aria-label="Search" />
                <button className="btn btn-warning text-dark my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>

            <form className="d-none d-md-block w-10" action="#" encType="multipart/form-data" id="language">
              <div className="btn-group">
                <select name="language" id="language-selection">
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="telgu">Telgu</option>
                </select>
              </div>
            </form>
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
