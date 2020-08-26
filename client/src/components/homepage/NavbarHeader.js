import React,{useState} from 'react'
import Modal from 'react-modal';
import Account from './Account';

Modal.setAppElement('#root');
function NavbarHeader() {
  const [modalIsOpen,setModalIsOpen] = useState(true);

    return (
      <div>
        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={()=> setModalIsOpen(false)}
          style={{
            overlay:{
              zIndex:1000
            },
            content:{
              top: "10%",
              bottom: "10%",
              right: "27%",
              left:"27%"
            }
          }}
        >
          <Account />
        </Modal>

        <nav id="menu" class="navbar">
            <div class="nav-inner container">
              <div class="navbar-header"><span id="category" class="visible-xs">Categories</span>
                <button type="button" class="btn btn-navbar navbar-toggle" ><i class="fa fa-bars"></i></button>
              </div>
              <div class="navbar-collapse">
                <ul class="main-navigation">
                  <li><a href="#"   class="parent"  >Home</a> </li>
                  {/* <li onClick={()=>setModalIsOpen(true)} className="parent">My Account</li> */}
                  <li><a href="#"   class="parent"  onClick={()=>setModalIsOpen(true)}>My Account</a> </li>
                  <li><a href="#"   class="parent"  >Cart</a> </li>
                  <li class="language">
                    <form action="#" enctype="multipart/form-data" id="language">
                      <div class="btn-group">
                        <button class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            English
                            <i class="fa fa-caret-down"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a href="#">Arabic</a></li>
                          <li><a href="#">English</a></li>
                        </ul>
                      </div>
                    </form>
                  </li>
                  <li class="search-box">
                        <input class="input-text" placeholder="search.." type="text" />
                        <button class="search-btn"><i class="fa fa-search"></i></button>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
      </div>
    )
}

export default NavbarHeader
