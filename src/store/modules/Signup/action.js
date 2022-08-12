/* eslint-disable no-useless-escape */
import cogoToast from 'cogo-toast';
import {
SIGNUP_START,
SIGNUP_SUCCESS,
SIGNUP_ERROR
} from './actionTypes';
import API from '../../../utils/API';


const showSuccessMessage = (message) => {
    cogoToast.success(message, { hideAfter: 15, position: 'top-center' });
  };

  const showErrorMessage = (message) => {
    cogoToast.error(message, { hideAfter: 5, position: 'top-center' });
  };

const apiStart = () =>({
    type: SIGNUP_START,
});

const apiSuccess = (payload) =>({
    type: SIGNUP_SUCCESS,
    payload
});

const apiError = (error) =>({
    type: SIGNUP_ERROR,
    error
});

export const signup = (email, password, cpassword) => async (dispatch) =>{
    if(email !== '' && password !== '' && cpassword !== '') {

        let validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email.match(validEmail)) {
            if(password === cpassword) {
            dispatch(apiStart());
        try {
            const jsonData = {
            "email": `${email}`,
            "password": `${password}`,
            "confirmPassword": `${cpassword}`
            };
            const response = await API.post('/api/v1/auth/signup', jsonData);
            showSuccessMessage('Account created successfully!');
            dispatch(apiSuccess(response));
        } catch (error) {
            if(error.response.data){
            showErrorMessage(error.response.data.message);
            } else {
                showErrorMessage('Error creating account, try again please!')
            }
            dispatch(apiError(error.response));
        }
            } else {
                    showErrorMessage('Password do not match.');
                }
            } else {
                showErrorMessage('Invalid Password!');
            }
            } else {
        showErrorMessage('All fields are required.');
        }
}