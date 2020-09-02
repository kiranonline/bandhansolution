import React,{useState} from 'react';
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { loading } from "../../actions/loadingAction";
import { modal } from "../../actions/modalAction";
import { login, setUserDetails } from "../../actions/authAction";
import './Account.css';
import krishi from "./static/images/krishi.jpeg";

function Account(props) {
    const [inview,changeinview] = useState('login');
    const [showotpfield,setshowotp] = useState(false);
    const {register, handleSubmit, errors} = useForm();
    const [otp, setOTP] = useState(new Array(6).fill(""));
    const [user_id,setuserid] = useState("");
    const [errormessage,seterrormessage] = useState("");

    const handleChangeotp = (element, index) => {
        if(isNaN(element.value)) return false;

        setOTP([...otp.map((d,idx) => (idx === index) ? element.value: d)])

        if(element.nextSibling){
            element.nextSibling.focus();
        }
    }
    
    const validateEmail = (value)=>{
        let pattern=/\S+@\S+\.\S+/;
        return pattern.test(value);
    }

    const onSubmitLogin=(data)=>{

        console.log(data);
        props.loading(true);
        http.post(apis.LOGIN_WITH_EMAIL_OR_PHONE,data)
        .then((result)=>{
            console.log(result);
            if(result.data.status){
                localStorage.setItem("Token", result.data.token);
                props.login(result.data.token,result.data.data);
                props.modal(false);
            }else{
                //code
                seterrormessage(result.data.message);
            }
        })
        .catch((err)=>{
            console.log(err);
            props.logout();
        }).finally(()=>{
            props.loading(false);
        })
    }

    const onSubmitRegitser= (data)=>{
        console.log(data);
        props.loading(true);
        http.post(apis.REGITER_WITH_EMAIL_OR_PHONE,data)
        .then((result)=>{
            console.log(result);
            if(result.data.status){
                setshowotp(true);
                setuserid(result.data.data);
            }else{
                seterrormessage(result.data.message);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            props.loading(false);
        })
    }

    const otpverification = (otp) => {
        const data={
            otp:otp.join(""),
            user_id:user_id
        }
        props.loading(true);
        http.post(apis.OTP_VERIFICATION,data)
        .then((result)=>{
            console.log(result);
            if(result.data.status){
                props.login(result.data.token,result.data.data);
            }
            else{
                // message.error(result.data.message);
                seterrormessage(result.data.message);
            }
            
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            props.loading(false);
            props.modal(false);
        })
    }

    return (
        <div>
            {inview=== 'login' ? 
            (
                <div className="login-wrapper">
                    <div >
                        {/* <div className="registerForm side-div ">
                            <div className="sidePart ">
                                <img src=" https://acad.xlri.ac.in/evening/images/login.svg" ></img>
                            </div>
                    
                        </div> */}
                    <div className="registerForm"   >
                    <div className="sidePart ">
                                <img src="https://acad.xlri.ac.in/evening/images/login.svg" className="login-img"></img>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit(onSubmitLogin)}>
                                    <h1>
                                        Welcome
                                    </h1>
                                    <div className="wrap-input100">
                                        <input className="input100" type="text" name="phoneNumber" placeholder="Phone Number" ref={register({required:true, minLength:10,maxLength:10})} /> 

                                            {/* <label for="phone" class="label-phone">
                                                <span class="content-phone">Phone</span>
                                            </label> */}
                                    </div>
                                    {errors.phoneNumber && (
                                            <p>Your phone number is required.</p>
                                        )}

                                    <div className="wrap-input100">
                                        <input className="input100" type="password" name="password" placeholder="Password" ref={register({required:true,minLength:5})}/> <br></br> 
                                            {/* <label for="password" class="label-password">
                                                <span class="content-password">Password</span>
                                            </label> */}
                                        {errors.password && (
                                            <p>Password is required.</p>
                                        )}
                                    </div>
                                    <div className="btn-login">
                                    <button className="login-form-btn">
                                        Login
                                    </button>
                                    </div>
                                    <div className="btn-signup">
                                    <button className="signup-form-btn" onClick={()=>changeinview("register")}>
                                            New User ? Sign up
                                        </button>
                                    </div>
                                </form>
                                </div>
                    </div>
                    <p className="errorMessage">{errormessage!==""&&errormessage}</p>
                </div>

            ):
            (
                <React.Fragment>
                    <div className={`otp-field ${showotpfield? "dblock":"dnone"}`}>
                        {otp.map((data,index) => {
                            return (
                                <input 
                                    className="otp-input"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={(e)=>handleChangeotp(e.target,index)}
                                    onFocus={e=> e.target.select()}
                                />
                            )
                        })}
                        <button onClick={()=> otpverification(otp)}>Verify</button>
                    </div>
                    <div className={`limiter ${showotpfield? "dnone":"dblock"}`}>
                        <div className="registerWrapper">
                            <div className="">
                                <div>
                                    <div className="registerForm side-div">
                                        {/* <div className="sidePart">
                                            
                                        </div> */}
                                    </div>
                                    <div className="registerForm">
                                    <div className="sidePart">
                                    <img src=" https://acad.xlri.ac.in/evening/images/login.svg" className="login-img"></img>
                                    </div>
                                        <form className="login100-form" onSubmit={handleSubmit(onSubmitRegitser)}>
                                        <h1 >
                                            Register
                                        </h1>
                                        <p className="errorMessage">{errormessage!==""&&errormessage}</p>
                                        <div className="wrap-input100">
                                            <input className="input100" type="text" name="phoneNumber" placeholder="Phone" autoComplete="off" ref={register({required:true,minLength:10,maxLength:10})} />
                                                {/* <label for="phone number" class="label-phone">
                                                    <span class="content-phone">Phone Number</span>
                                                </label> */}
                                        </div>
                                        {errors.phoneNumber && (
                                            <p>Your phone number is required.</p>
                                        )}

                                        <div className="wrap-input100">
                                            <input className="input100" type="text" name="email" placeholder="Email" autoComplete="off" ref={register({validate:validateEmail})} />
                                                {/* <label for="email" class="label-email">
                                                    <span class="content-email">Email</span>
                                                </label> */}
                                        </div>
                                        {errors.email && (
                                            <p>Email is required.</p>
                                        )}

                                        <div className="wrap-input100">
                                            <input className="input100" type="text" name="name" placeholder="Name" autoComplete="off" ref={register({required:true})}/>
                                                {/* <label for="name" class="label-name">
                                                    <span class="content-name">Name</span>
                                                </label> */}
                                        </div>
                                        {errors.name && (
                                            <p>This is required.</p>
                                        )}

                                        <div className="wrap-input100">
                                            <input className="input100" type="password" name="password" placeholder="Password" autoComplete="off" ref={register({required:true, minLength:5})} />
                                                {/* <label for="password" class="label-password">
                                                    <span class="content-password">Password</span>
                                                </label> */}
                                        </div>
                                        {errors.password && (
                                            <p>This is required and enter more than 5 characters.</p>
                                        )}

                                        <div className="container-login100-form-btn">
                                            <div className="wrap-login100-form-btn">
                                                <div className="login100-form-bgbtn"></div>
                                            </div>
                                        </div>
                                        <div className="btn-login">
                                        <button className="login-form-btn">
                                            Register
                                        </button>
                                        </div>
                                        <div className="btn-signup">
                                        <button className="signup-form-btn" onClick={()=>changeinview('login')}>
                                            Existing User? Sign In
                                        </button>
                                        </div>
                                    </form>
                                    
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </React.Fragment>
            )
        }        
        </div>
    )
}

const mapStateToProps = (state) => ({
    Auth: state.Auth
});
  
export default connect(mapStateToProps, { 
    loading,
    login,
    modal,
    setUserDetails
})(Account);
