import { combineReducers } from 'redux'; 
import Loader from "./loaderReducer";
import Auth from "./authReducer";
import Modal from "./modalReducer";

export default combineReducers({
    Loader,
    Auth,
    Modal
});