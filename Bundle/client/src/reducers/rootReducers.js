import { combineReducers } from 'redux'; 
import Loader from "./loaderReducer";
import Auth from "./authReducer";
import Modal from "./modalReducer";
import FetchCategories from "./categoryReducer";
import FetchProducts from "./productListReducer";
import CartQuantity from "./cartReducer";

export default combineReducers({
    Loader,
    Auth,
    Modal,
    FetchCategories,
    FetchProducts,
    CartQuantity,
});