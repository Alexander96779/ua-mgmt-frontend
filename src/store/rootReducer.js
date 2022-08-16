import { combineReducers } from 'redux';
import userSignup from './modules/Signup/reducer';
import userLogin from './modules/Login/reducer';
import userForgotPassword from './modules/ForgotPassword/reducer';
import userResetPassword from './modules/ResetPassword/reducer';
import addNewProfile from './modules/Profile/reducer';
import addNewDocument from './modules/Verification/reducer';
import getUserInfo from './modules/ViewUser/reducer';

const rootReducer = combineReducers({
    userSignup,
    userLogin,
    userForgotPassword, 
    userResetPassword,
    addNewProfile,
    addNewDocument,
    getUserInfo
});

export default rootReducer;