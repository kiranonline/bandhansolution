import { combineReducers } from 'redux'; 
import Loader from "./loaderReducer";
import Auth from "./authReducer";

export default combineReducers({
    Loader,
    Auth
});