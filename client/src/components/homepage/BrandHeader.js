import React from 'react';
import logo from './static/images/logo.png'

function BrandHeader() {
    return (
        <div className="container">
            <div className="header-inner">
                <div className="col-sm-4 col-xs-12 header-middle">
                    <div className="header-middle-top">
                    <div id="logo">
                        <a href="#">
                            <img src={logo} title="E-Commerce" alt="E-Commerce" className="img-responsive" />
                        </a> 
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrandHeader
