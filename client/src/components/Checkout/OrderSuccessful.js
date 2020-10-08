import React from 'react'
import {Link} from 'react-router-dom'

function OrderSuccessful() {
    return (
        <div className="container">
            <ul className="breadcrumb">
                <li><Link to="/"><i className="fa fa-home">Home</i></Link></li>
            </ul>

            <div className="d-flex flex-md-row flex-column justify-content-center align-items-center pb-3">
                <div className="pr-md-5">
                    <i className="fa fa-check text-success" style={{fontSize: "10rem"}}></i>
                </div>
                <div>
                    <h1 className="h3">Your order was successfully placed. Check your order out at your profile's Order History tab</h1>
                    <Link className="btn btn-primary mt-2" to={{pathname: "/profile", state: {page: 2}}}>Profile Page</Link>
                </div>
            </div>

        </div>
    )
}

export default OrderSuccessful
