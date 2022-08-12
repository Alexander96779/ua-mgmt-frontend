/* eslint-disable no-useless-escape */
import cogoToast from 'cogo-toast';
import {
RESET_PASSWORD_START,
RESET_PASSWORD_SUCCESS,
RESET_PASSWORD_ERROR
} from './actionTypes';
import API from '../../../utils/API';
import history from '../../../utils/history';

const showSuccessMessage = (message) => {
    cogoToast.success(message, { hideAfter: 5, position: 'top-center' });
  };

  const showErrorMessage = (message) => {
    cogoToast.error(message, { hideAfter: 5, position: 'top-center' });
  };

const apiStart = () =>({
    type: RESET_PASSWORD_START,
});

const apiSuccess = (payload) =>({
    type: RESET_PASSWORD_SUCCESS,
    payload
});

const apiError = (error) =>({
    type: RESET_PASSWORD_ERROR,
    error
});

export const resetPassword = (password, cpassword) => async (dispatch) =>{
    if(password !== '' && cpassword !== '') {

        let validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

        if(password.match(validPassword)){
            if(password === cpassword) {

                dispatch(apiStart());
        try {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const token = urlParams.get('token');
           const jsonData = {
               "password": `${password}`,
               "confirmPassword": `${cpassword}`
           };
        const response = await API.post(`/api/v1/resetpassword?token=${token}`, jsonData);
        showSuccessMessage(response.data.message);
        dispatch(apiSuccess(response.data));
        history.push('/');
        } catch (error) {
        if (error.response.data) {
            showErrorMessage(error.response.data.message);
        } else {
        showErrorMessage('Reset Password did not succeed, try again later!');
        }
        dispatch(apiError(error.response));
        }
        } else {
            showErrorMessage('Passwords do not match!');
        }
        } else {
        showErrorMessage('Invalid Password!');
    }
    } else {
        showErrorMessage('All fields are required!');
    }
}