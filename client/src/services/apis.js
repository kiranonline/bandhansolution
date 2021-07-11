const envoirnment = process.env.NODE_ENV;
const apis = {

    BASE_LOCAL_URL : envoirnment === "development" ? "http://localhost:7000" : "",
    BASE_SERVER_URL : envoirnment === "development"? "http://localhost:4500": "",

    GET_USER_DETAILS:"/apis/v1/userdetails",
    LOGIN_WITH_EMAIL_OR_PHONE : "/apis/v1/user/login-with-email-or-phone-password",
    REGITER_WITH_EMAIL_OR_PHONE : "/apis/v1/user/createnormal",
    OTP_VERIFICATION : "/apis/v1/user/otpverification",
    RESEND_OTP : "/apis/v1/user/resend_otp",
    FORGOT_PASSWORD : "/apis/v1/user/forgotpassword",
    RESEND_OTP_PASSWORD_CHANGE : "/apis/v1/user/resendotppasswordchange",
    CHANGE_PASSWORD : "/apis/v1/user/changepassword",

    GET_CATEGORY_LIST : "/apis/v1/user/category/list",
    GET_PRODUCT_LIST : "/apis/v1/user/productlist/",
    GET_SINGLE_PRODUCT : "/apis/v1/product/",
    ADD_TO_CART : "/apis/v1/user/add-to-cart",
    FETCH_THE_CART : "/apis/v1//user/fetch-the-cart",

    FETCH_PRODUCT_HIGHLIGHT : "/apis/v1/user/producthighlight",

    UPLOAD_USER_AVATAR:"/apis/v1/upload-avatar",
    UPDATE_PASSWORD:"/apis/v1/user/update-password",


    GET_ADDRESS_LIST:"/apis/v1/user/get/address",
    ADD_NEW_ADDRESS:"/apis/v1/user/add/address",
    EDIT_ADDRESS:"/apis/v1/user/edit/address",
    REMOVE_ADDRESS:"/apis/v1/user/remove/address",
    SET_DEFAULT_ADDRESS:"/apis/v1/user/setdefault/address",

    USER_UPDATE_PROFILE_PIC: "/apis/v1/user/update-profile-pic",
    UPDATE_CART: "/apis/v1/user/update-cart",
    AVAILABLE_FOR_CART: "/apis/v1/user/available-for-cart",


    PLACE_ORDERS: "/apis/v1/user/place-order-actual",
    GET_ORDERS: "/apis/v1/user/get-orders",
    CANCEL_ORDER: "/apis/v1/user/cancel-order",
    ORDER_DETAILS:"/apis/v1/order/details",





    LIST_POSTERS:"/apis/v1/list-poster",





    API_KEY_LOCATION_IQ : "pk.3677164e2f3425a36d5b009615e198a2",
    API_KEY_OPEN_WEATHER : "092b62bb5b28a5a386dedaa38f48429b"
};

export default apis;