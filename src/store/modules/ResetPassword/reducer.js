const initialState = {
    isLoading: false,
    payload: [],
    error: null
};

const userResetPassword = (state = initialState, action) => {
    const { type, payload, error } = action;

    switch(type) {
        case 'RESET_PASSWORD_START': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'RESET_PASSWORD_SUCCESS': {
            return {
                ...state,
                payload: payload,
                isLoading: false
            };
        }
        case 'RESET_PASSWORD_ERROR': {
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

export default userResetPassword;