const envoirnment = process.env.NODE_ENV;
const apis = {

    BASE_LOCAL_URL : envoirnment === "development" ? "http://localhost:8100" : "",
    BASE_SERVER_URL : envoirnment === "development"? "http://localhost:4500": "http://localhost:4500",
    
    REGISTER : "/apis/v1/user/createnormal",
    OTP_VERIFICATION : "/apis/v1/user/otpverification",
    LOGIN_WITH_EMAIL_OR_PHONE : "/apis/v1/user/login-with-email-or-phone-password",
    
};

export default apis;