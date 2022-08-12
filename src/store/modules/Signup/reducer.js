const initialState = {
    isLoading: false,
    payload: [],
    error: null
};

const userSignup = (state = initialState, action) =>{
    const { type, payload, error } = action;

    switch(type) {
        case 'SIGNUP_START': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'SIGNUP_SUCCESS': {
            return {
                ...state,
                payload: payload,
                isLoading: false
            };
        }
        case 'SIGNUP_ERROR': {
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

export default userSignup;