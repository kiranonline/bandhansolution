const envoirnment = process.env.NODE_ENV;
const apis = {

    BASE_LOCAL_URL : envoirnment === "development" ? "http://localhost:7000" : "",
    BASE_SERVER_URL : envoirnment === "development"? "http://localhost:4500": "http://localhost:4500",
    
    LOGIN_WITH_EMAIL_AND_PASSWORD : "/apis/v1/login-with-email-password",
    GET_USER_DETAILS:"/apis/v1/userdetails",


    UPLOAD_USER_AVATAR:"/apis/v1/upload-avatar",
    USER_CREATE:"/apis/v1/user/create",
    LIST_USERS:"/apis/v1/user/list",


    CATEGORY_CREATE : "/apis/v1/category/create",
    LIST_CATEGORY : "/apis/v1/category/list",


    CREATE_PRODUCT : "/apis/v1/product/create",
    UPLOAD_PRODUCT_IMAGE : "/apis/v1/upload-product-image",
    LIST_PRODUCTS_FOR_ADMIN : "/apis/v1/product/listforadmin",
    PRODUCT_DETAILS_FOR_ADMIN : "/apis/v1/product/detailsofadmin"
    
};

export default apis;