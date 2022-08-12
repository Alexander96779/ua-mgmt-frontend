/* eslint-disable no-useless-escape */
import cogoToast from 'cogo-toast';
import {
FORGOT_PASSWORD_START,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_ERROR
} from './actionTypes';
import API from '../../../utils/API';

const showSuccessMessage = (message) => {
    cogoToast.success(message, { hideAfter: 10, position: 'top-center' });
  };

  const showErrorMessage = (message) => {
    cogoToast.error(message, { hideAfter: 10, position: 'top-center' });
  };

const apiStart = () =>({
    type: FORGOT_PASSWORD_START,
});

const apiSuccess = (payload) =>({
    type: FORGOT_PASSWORD_SUCCESS,
    payload
});

const apiError = (error) =>({
    type: FORGOT_PASSWORD_ERROR,
    error
});

export const forgotPassword = (email) => async (dispatch) =>{
    if(email !== '') {

    let validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email.match(validEmail)){
                dispatch(apiStart());
        try {
           const jsonData = {
               "email": `${email}`,
           };
        const response = await API.post('/api/v1/forgotpassword', jsonData);
        showSuccessMessage('Reset password Email sent successfully! check your inbox if not found check the spam');
        dispatch(apiSuccess(response.data));
        } catch (error) {
        if(error.response.data) {
            showErrorMessage(error.response.data.message);
        } else {
        showErrorMessage('Reset password email not sent, Try again!');
        }
        dispatch(apiError(error.response));
        }
        } else {
        showErrorMessage('Invalid Email!');
    }
    } else {
        showErrorMessage('All fields are required!');
    }
}