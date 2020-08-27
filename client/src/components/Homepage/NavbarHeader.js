import React,{useState} from 'react'
import Modal from 'react-modal';
import {connect} from 'react-redux';
import Account from './Account';
import { modal } from "../../actions/modalAction";

Modal.setAppElement('#root');
function NavbarHeader(props) {
  // const [modalIsOpen,setModalIsOpen] = useState(false);
  const login_item=props.auth.isLoggedIn?{display:"none"}:{}
  const myaccount_item=props.auth.isLoggedIn?{}:{display:"none"}

    return (
      <div>
        <Modal 
          isOpen={props.modalisopen.loading}
          onRequestClose={()=> props.modal(false)}
          style={{
            overlay:{
              zIndex:1000
            },
            content:{
              top: "10%",
              bottom: "10%",
              right: "29%",
              left:"27%",
              overflow: 'hidden',
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
                  <li className="search-box">
                        <input className="input-text" placeholder="search.." type="text" />
                        <button className="search-btn"><i className="fa fa-search"></i></button>
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
