const envoirnment = process.env.NODE_ENV;
const apis = {

    BASE_LOCAL_URL : envoirnment === "development" ? "http://localhost:8100" : "",
    BASE_SERVER_URL : envoirnment === "development"? "http://localhost:4500": "https://bandhansolutions.herokuapp.com",
    
    REGISTER : "/apis/v1/user/createnormal",
    OTP_VERIFICATION : "/apis/v1/user/otpverification",
    LOGIN_WITH_EMAIL_OR_PHONE : "/apis/v1/user/login-with-email-or-phone-password",
    GET_USER_DETAILS:"/apis/v1/userdetails",


    GET_ADDRESSES : "/apis/v1/user/get/address",
    ADD_ADDRESS:"/apis/v1/user/add/address",
    EDIT_ADDRESS : "/apis/v1/user/edit/address",


    FETCH_PRODUCT_HIGHLIGHT : "/apis/v1/user/producthighlight",



    GET_SINGLE_PRODUCT : "/apis/v1/product",
    ADD_TO_CART : "/apis/v1/user/add-to-cart",
    FETCH_THE_CART : "/apis/v1//user/fetch-the-cart",
    UPDATE_CART: "/apis/v1/user/update-cart",
    
};

export default apis;