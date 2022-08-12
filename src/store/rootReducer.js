import { combineReducers } from 'redux';
import userSignup from './modules/Signup/reducer';
import userLogin from './modules/Login/reducer';
import userForgotPassword from './modules/ForgotPassword/reducer';
import userResetPassword from './modules/ResetPassword/reducer';

const rootReducer = combineReducers({
    userSignup,
    userLogin,
    userForgotPassword, 
    userResetPassword
});

export default rootReducer;