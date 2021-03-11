import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {connect} from "react-redux";
import { loading } from "../../actions/loadingAction";
import "./ForgotPassword.css"
import http from '../../services/httpCall';
import apis from '../../services/apis';

function ForgotPassword({loading}) {
    let [otpmodal, setotpmodal] = useState(false);
    let [showforgotpassword, setshowforgotpassword] = useState(true);
    let [otp, setOTP] = useState(new Array(6).fill(""));
    let [otpresent, setotpresent] = useState(false);
    let [phoneNumber, setphoneNumber] = useState();
    let [newpassword,setnewpassword] = useState();
    let [confirmnewpassword,setconfirmnewpassword] = useState();
    let history = useHistory();

    const handleChangeotp = (element, index) => {
        if(isNaN(element.value)) return false;

        setOTP([...otp.map((d,idx) => (idx === index) ? element.value: d)])

        if(element.parentElement.nextSibling){
            element.parentElement.nextSibling.firstChild.focus();
        }
    }

    // changepassword
    const changepassword = async()=>{
        try{
            // console.log(otp.join(""));
            // console.log(phoneNumber);
            // console.log(newpassword);
            loading(true);
            if(newpassword!==confirmnewpassword){
                alert("sorry, please match both of the passwords");
                return;
            }

            let response = await http.post(apis.CHANGE_PASSWORD,{
                phoneNumber:phoneNumber,
                otpnumber: otp.join(""),
                newpassword:newpassword
            });
            console.log(response);
            if(response.data.status){
                alert(response.data.message);
                setshowforgotpassword(true);
                setotpmodal(false);
                history.push("/");
            }else{
                alert(response.data.message);
            }
        }catch(err){
            console.log(err);
        }finally{
            loading();
        }
    }

    // resend otp
    const resendotp = async()=>{
        try{
            loading(true);
            let response = await http.post(apis.RESEND_OTP_PASSWORD_CHANGE,{
                phoneNumber
            })
            console.log(response)
            if(response.data.status){
                alert(response.data.otp);
            }else{
                alert(response.data.message);
            }
        }
        catch(err){
            console.log(err);
        }finally{
            loading();
        }

    }

    // send me the otp
    const sendotp = async()=>{
        try{
            loading(true);
            let response = await http.post(apis.FORGOT_PASSWORD, {
                phoneNumber
            })
            console.log(response);
            if(response.data.status){
                setotpmodal(true);
                setphoneNumber(response.data.phoneNumber);
                alert(response.data.otp);
                setshowforgotpassword(false);
            }else{
                console.log(response.data.message);
            }
        }catch(err){
            console.log(err);
        }finally{
            loading();
        }
    }

    return (
        <>
        {/* ask new password & confirmnew password, then change it if the otp matches and pull the otp */}
        {/* verify the otp stored in this user's db & revert back with the otp */}
        {/* otp phoneNumber newpassword */}
        {otpmodal &&
        <div className="otp-changepassword">
            <div className="validateotp-field">
                <div className="validateotp-field-inner">
                    <h3 className="h3 text-center mb-3">Enter your OTP to validate & change your password</h3>

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
                    {/* <button className="btn btn-warning w-50 d-block text-dark mt-2 mx-auto" 
                    onClick={()=> otpverification(otp)}>Verify</button> */}
                    {/* {
                        otpresent ? 
                        <p className="mt-3 text-center">
                            Your OTP is validating, please refresh the page and try again to request
                        </p>:
                        <p className="mt-3 text-center">
                            Forgot your OTP?&nbsp; 
                            <Link className="text-primary font-weight-bold" style={{cursor: "pointer"}} to="#" onClick={()=>resendotp()}>Resend OTP</Link>
                        </p>
                    } */}
                </div>
            </div>
            <div className="changepassword">
                <div className="changepassword-inner">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text changepassword-span" id="inputGroup-sizing-sm">New Password</span>
                        </div>
                        <input type="password" className="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" onChange={(e)=>{setnewpassword(e.target.value)}}/>
                    </div>
                    <br/>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text changepassword-span" id="inputGroup-sizing-sm">Confirm New Password</span>
                        </div>
                        <input type="password" className="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" onChange={(e)=>{setconfirmnewpassword(e.target.value)}}/>
                    </div>
                    <button type="button" 
                    onClick={()=>{changepassword()}}
                    className="btn btn-success changepassword-btn">Change Password</button>
                </div>
                <div className="resend-otp">
                <p className="mt-3 text-center">
                            Forgot your OTP?&nbsp; 
                            <Link className="text-primary font-weight-bold" style={{cursor: "pointer"}} to="#" onClick={()=>resendotp()}>Resend OTP</Link>
                        </p>
                </div>
            </div>
        </div>
        }
        {/* store the otp if the mobile number is registered, then show otp field to enter*/}
        {showforgotpassword && 
            <div className="forgotpassword">
                <div className="forgotpassword-header">
                    <p>Forgot your password, you can change it here.</p>
                </div>
                <div className="forgotpassword-inner">
                    <div className="input-group input-group-sm mb-3">
                        <input type="number" className="form-control" placeholder="Enter your registered mobile number" 
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(e)=>{setphoneNumber(e.target.value)}}
                        />
                    </div>
                    <button type="button" onClick={()=>sendotp()}
                    className="btn btn-success">Send me the otp</button>
                </div>
            </div>
        }
        </>
    )
}


const mapStateToProps = (state) => ({
    Auth: state.Auth
});
  
export default connect(mapStateToProps, { 
    loading
})(ForgotPassword);
