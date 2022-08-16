import cogoToast from 'cogo-toast';
import {
ADD_PROFILE_START,
ADD_PROFILE_SUCCESS,
ADD_PROFILE_ERROR
} from './actionTypes';
import API from '../../../utils/API';
import AuthService from '../../../utils/AuthService';

const showSuccessMessage = (message) => {
    cogoToast.success(message, { hideAfter: 5, position: 'top-center' });
};

const showErrorMessage = (message) => {
    cogoToast.error(message, { hideAfter: 5, position: 'top-center' });
};

const apiStart = () => ({
    type: ADD_PROFILE_START,
});

const apiSuccess = (payload) => ({
    type: ADD_PROFILE_SUCCESS,
    payload
});

const apiError = (error) => ({
    type: ADD_PROFILE_ERROR,
    error
});

export const addProfile = (data) => async (dispatch) => {

        dispatch(apiStart());
        try {
            const token = AuthService.getToken();
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await API.post('/api/v1/profile', data, config);
            showSuccessMessage(response.data.message);
            dispatch(apiSuccess(response.data));
        } catch (error) {
            console.log(error.response);
            if (error.response.data) {
                showErrorMessage(error.response.data.message);
            } else {
            showErrorMessage('Could not add user profile, try again');
            }
            dispatch(apiError(error.response));
        }
}