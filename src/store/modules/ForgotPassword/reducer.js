const initialState = {
    isLoading: false,
    payload: [],
    error: null
};

const userForgotPassword = (state = initialState, action) => {
    const { type, payload, error } = action;

    switch(type) {
        case 'FORGOT_PASSWORD_START': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'FORGOT_PASSWORD_SUCCESS': {
            return {
                ...state,
                payload: payload,
                isLoading: false
            };
        }
        case 'FORGOT_PASSWORD_ERROR': {
            return {
                ...state,
                error: error,
                isLoading: false
            };
        }
        default:{
            return state;
        }
    }
}

export default userForgotPassword;