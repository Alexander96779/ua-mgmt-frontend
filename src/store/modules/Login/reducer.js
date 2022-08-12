const initialState = {
    isLoading: false,
    payload: [],
    error: null
};

const userLogin = (state = initialState, action) =>{
    const { type, payload, error } = action;

    switch(type) {
        case 'LOGIN_START': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                payload: payload,
                isLoading: false
            };
        }
        case 'LOGIN_ERROR': {
            return {
                ...state,
                error: error,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
}

export default userLogin;