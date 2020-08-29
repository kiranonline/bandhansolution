import React,{useState,useEffect,useHistory} from 'react'
import Modal from 'react-modal';
import {connect} from 'react-redux';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import Account from './Account';
import { modal } from "../../actions/modalAction";
import krishi from "./static/images/krishi.jpeg";


Modal.setAppElement('#root');
function NavbarHeader(props) {
  // const [modalIsOpen,setModalIsOpen] = useState(false);
  const [search_query,setSearchQuery] = useState("s");
  const login_item=props.auth.isLoggedIn?{display:"none"}:{}
  const myaccount_item=props.auth.isLoggedIn?{}:{display:"none"}
  // const history= useHistory();

  const handleSearch = () => {
    // console.log(history);
    console.log(search_query);
  }

    return (
      <div>
        <Modal 
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
          <Account />
        </Modal>

        <nav id="menu" className="navbar">
            <div className="nav-inner container">
              <div className="navbar-header"><span id="category" className="visible-xs">Categories</span>
                <button type="button" className="btn btn-navbar navbar-toggle" ><i className="fa fa-bars"></i></button>
              </div>
              <div className="navbar-collapse">
                <ul className="main-navigation">
                  <li><a href="#"   className="parent"  >Home</a> </li>
                  <li className="search-box">
                        <input placeholder="search.." type="text" onClick={(e)=> setSearchQuery(e.target.value)}/>
                        <button onClick={()=>handleSearch()}><i className="fa fa-search"></i></button>
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
