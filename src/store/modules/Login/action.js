/* eslint-disable no-useless-escape */
import cogoToast from 'cogo-toast';
import jwtDecode from 'jwt-decode';
import {
LOGIN_START,
LOGIN_SUCCESS,
LOGIN_ERROR
} from './actionTypes';
import API from '../../../utils/API';
import AuthService from '../../../utils/AuthService';
import history from '../../../utils/history';


const showErrorMessage = (message) => {
    cogoToast.error(message, { hideAfter: 5, position: 'top-center' });
  };

const apiStart = () =>({
    type: LOGIN_START,
});

const apiSuccess = (payload) =>({
    type: LOGIN_SUCCESS,
    payload
});

const apiError = (error) =>({
    type: LOGIN_ERROR,
    error
});

export const login = (email, password) => async (dispatch) =>{
    if(email !== '' && password !== '') {
    dispatch(apiStart());
        try {
           const jsonData = {
               "email": `${email}`,
               "password": `${password}`
           };
        const response = await API.post('/api/v1/auth/authenticate', jsonData);
        dispatch(apiSuccess(response.data));
        AuthService.setToken(response.data.payload);
        const decodedToken = jwtDecode(response.data.payload);
        const userInfo = JSON.parse(decodedToken.sub);
        AuthService.setUsername(userInfo.email);
        localStorage.setItem('user_role', userInfo.roles);
        history.push('/dashboard');
        } catch (error) {
        if (error.response.data) {
            showErrorMessage(error.response.data.message);
        } else {
        showErrorMessage('Wrong email or password!');
        }
        dispatch(apiError(error.response));
        }
    } else {
        showErrorMessage('All fields are required!');
    }
}