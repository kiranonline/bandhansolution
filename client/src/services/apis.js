const environment = process.env.NODE_ENV;
const apis = {

    BASE_LOCAL_URL : environment === "development" ? "http://localhost:7000" : "",
    BASE_SERVER_URL : environment === "development"? "http://localhost:4500": "http://localhost:4500",

    GET_USER_DETAILS:"/apis/v1/userdetails",
    LOGIN_WITH_EMAIL_OR_PHONE : "/apis/v1/user/login-with-email-or-phone-password",
    REGITER_WITH_EMAIL_OR_PHONE : "/apis/v1/user/createnormal",
    OTP_VERIFICATION : "/apis/v1/user/otpverification",
    GET_CATEGORY_LIST : "/apis/v1/user/category/list",
    GET_PRODUCT_LIST : "/apis/v1/user/productlist/",


    UPLOAD_USER_AVATAR:"/apis/v1/upload-avatar"    
};

export default apis;