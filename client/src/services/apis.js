const envoirnment = process.env.NODE_ENV;
const apis = {

    BASE_LOCAL_URL : envoirnment === "development" ? "http://localhost:7000" : "",
    BASE_SERVER_URL : envoirnment === "development"? "http://localhost:4500": "https://bandhansolutions.herokuapp.com",

    GET_USER_DETAILS:"/apis/v1/userdetails",
    LOGIN_WITH_EMAIL_OR_PHONE : "/apis/v1/user/login-with-email-or-phone-password",
    REGITER_WITH_EMAIL_OR_PHONE : "/apis/v1/user/createnormal",
    OTP_VERIFICATION : "/apis/v1/user/otpverification",
    GET_CATEGORY_LIST : "/apis/v1/user/category/list",
    GET_PRODUCT_LIST : "/apis/v1/user/productlist/",
    GET_SINGLE_PRODUCT : "/apis/v1/product/",
    ADD_TO_CART : "/apis/v1/user/add-to-cart",
    FETCH_THE_CART : "/apis/v1//user/fetch-the-cart",

    FETCH_PRODUCT_HIGHLIGHT : "/apis/v1/user/producthighlight",

    UPLOAD_USER_AVATAR:"/apis/v1/upload-avatar"    
};

export default apis;