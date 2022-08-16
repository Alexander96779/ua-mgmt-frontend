import cogoToast from 'cogo-toast';
import jwtDecode from 'jwt-decode';
import {
GET_USER_START,
GET_USER_SUCCESS,
GET_USER_ERROR
} from './actionTypes';
import API from '../../../utils/API';
import AuthService from '../../../utils/AuthService';


const showErrorMessage = (message) => {
    cogoToast.error(message, { hideAfter: 5, position: 'top-center' });
  };

const apiStart = () =>({
    type: GET_USER_START,
});

const apiSuccess = (payload) =>({
    type: GET_USER_SUCCESS,
    payload
});

const apiError = (error) =>({
    type: GET_USER_ERROR,
    error
});

export const getUser = () => async (dispatch) =>{
        dispatch(apiStart());
        try {
        const token = AuthService.getToken();
        const config = {
            headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                  },
                };
        const decodedToken = jwtDecode(token);
        const userInfo = JSON.parse(decodedToken.sub);
        const id = userInfo.id;

        const response = await API.get(`/api/v1/users/${id}`, config);
        dispatch(apiSuccess(response.data));
        } catch (error) {
        console.log(error.response);
        if (error.response.data) {
            showErrorMessage(error.response.data.message);
        } else {
        showErrorMessage('Could not retrieve user info, Try again!');
        }
        dispatch(apiError(error.response));
        }
}