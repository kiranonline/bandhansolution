const envoirnment = process.env.NODE_ENV;
const apis = {

    BASE_LOCAL_URL : envoirnment === "development" ? "http://localhost:7000" : "",
    BASE_SERVER_URL : envoirnment === "development"? "http://localhost:4500": "",
    
    LOGIN_WITH_EMAIL_AND_PASSWORD : "/apis/v1/login-with-email-password",
    GET_USER_DETAILS:"/apis/v1/userdetails",
    GET_PROFILE_DETAILS:"/apis/v1/profiledetails",
    UPDATE_PROFILE_DETAILS:"/apis/v1/update-profile",


    UPLOAD_USER_AVATAR:"/apis/v1/upload-avatar",
    USER_CREATE:"/apis/v1/user/create",
    LIST_USERS:"/apis/v1/user/list",


    CATEGORY_CREATE : "/apis/v1/category/create",
    LIST_CATEGORY : "/apis/v1/category/list",


    CREATE_PRODUCT : "/apis/v1/product/create",
    EDIT_PRODUCT : "/apis/v1/product/edit",
    UPLOAD_PRODUCT_IMAGE : "/apis/v1/upload-product-image",
    LIST_PRODUCTS_FOR_ADMIN : "/apis/v1/product/listforadmin",
    PRODUCT_DETAILS_FOR_ADMIN : "/apis/v1/product/detailsofadmin",
    STOCK_LIST_FOR_ADMIN:"/apis/v1/product/stock-list-foradmin",

    LIST_PRODUCT_FOR_SELLER : "/apis/v1/product/listforseller",
    PRODUCT_DETAILS_FOR_SELLER : "/apis/v1/product/detailsforseller",
    UPDATE_PRODUCT_STOCK_SELLER : '/apis/v1/product/stock/updatebyseller',




    GET_ORDERS_LIST:"/apis/v1/seller/get-my-orders",
    ORDER_DETAILS:"/apis/v1/order/details",
    UPDATE_ORDER_STATUS:"/apis/v1/order/update-status-details",




    UPLOAD_POSTER : "/apis/v1/upload-poster",
    LIST_POSTER : "/apis/v1/list-poster",
    DELETE_POSTER:"/apis/v1/delete-poster"


};

export default apis;