import { combineReducers } from 'redux';
import Loader from "./loaderReducer";
import Auth from "./authReducer";
import Language from "./languageReducer"
export default combineReducers({
    Loader,
    Auth,
    Language
});