import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Validateotp.css"

function Validateotp() {
    let [otp, setOTP] = useState(new Array(6).fill(""));
    let [otpresent, setotpresent] = useState(false);
    let [showotpfield, setshowotpfield] = useState(true);

    const handleChangeotp = (element, index) => {
        if(isNaN(element.value)) return false;

        setOTP([...otp.map((d,idx) => (idx === index) ? element.value: d)])

        if(element.parentElement.nextSibling){
            element.parentElement.nextSibling.firstChild.focus();
        }
    }

    // otp verification
    const otpverification = ()=>{

    }

    // resend otp
    const resendotp = ()=>{

    }

    

    return (
        <>
        <div className="validateotp-field">
            <div className="validateotp-field-inner">
                <h3 className="h3 text-center mb-3">Enter your OTP to validate</h3>

                <div className="row w-50 mx-auto" >
                    {otp.map((data,index) => {
                        return (
                            <div className="col-2 px-2" key={index}>
                                <input 
                                    className="otp-input w-100 text-center"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    value={data}
                                    onChange={(e)=>handleChangeotp(e.target,index)}
                                    onFocus={e=> e.target.select()}
                                    style={{width: "10%", fontSize: "1.2rem"}}
                                />

                            </div>
                        )
                    })}
                </div>
                <button className="btn btn-warning w-50 d-block text-dark mt-2 mx-auto" onClick={()=> otpverification(otp)}>Verify</button>
                {
                    otpresent ? 
                    <p className="mt-3 text-center">
                        Your OTP is validating, please refresh the page and try again to request
                    </p>:
                    <p className="mt-3 text-center">
                        Forgot your OTP?&nbsp; 
                        <Link className="text-primary font-weight-bold" style={{cursor: "pointer"}} to="#" onClick={()=>resendotp()}>Resend OTP</Link>
                    </p>
                }
            </div>
        </div>
        </>
    )
}

export default Validateotp
