const envoirnment = process.env.NODE_ENV;
const apis = {

    BASE_LOCAL_URL : envoirnment === "development" ? "http://localhost:8100" : "",
    BASE_SERVER_URL : envoirnment === "development"? "http://localhost:4500": "https://bandhansolution.com",

    REGISTER : "/apis/v1/user/createnormal",
    OTP_VERIFICATION : "/apis/v1/user/otpverification",
    LOGIN_WITH_EMAIL_OR_PHONE : "/apis/v1/user/login-with-email-or-phone-password",
    GET_USER_DETAILS:"/apis/v1/userdetails",


    GET_ADDRESSES : "/apis/v1/user/get/address",
    ADD_ADDRESS:"/apis/v1/user/add/address",
    EDIT_ADDRESS : "/apis/v1/user/edit/address",

    UPLOAD_USER_AVATAR:"/apis/v1/upload-avatar",
    USER_UPDATE_PROFILE_PIC: "/apis/v1/user/update-profile-pic",
    REMOVE_ADDRESS:"/apis/v1/user/remove/address",


    FETCH_PRODUCT_HIGHLIGHT : "/apis/v1/user/producthighlight",



    GET_SINGLE_PRODUCT : "/apis/v1/product",
    ADD_TO_CART : "/apis/v1/user/add-to-cart",
    FETCH_THE_CART : "/apis/v1//user/fetch-the-cart",
    UPDATE_CART: "/apis/v1/user/update-cart",





    GET_CATEGORY_LIST : "/apis/v1/user/category/list",
    GET_PRODUCT_LIST : "/apis/v1/user/productlist/",
    GET_ADDRESS_LIST:"/apis/v1/user/get/address",
    AVAILABLE_FOR_CART: "/apis/v1/user/available-for-cart",
    SET_DEFAULT_ADDRESS:"/apis/v1/user/setdefault/address",
    PLACE_ORDERS: "/apis/v1/user/place-order-actual",
    GET_ORDERS: "/apis/v1/user/get-orders",
    ORDER_DETAILS:"/apis/v1/order/details",



    LIST_POSTERS:"/apis/v1/list-poster",



    API_KEY_LOCATION_IQ : "pk.3677164e2f3425a36d5b009615e198a2",
    API_KEY_OPEN_WEATHER : "092b62bb5b28a5a386dedaa38f48429b"

};

export default apis;