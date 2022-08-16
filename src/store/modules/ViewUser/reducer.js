const initialState = {
    isLoading: false,
    data: [],
    error: null
};

const getUserInfo = (state = initialState, action) => {
    const { type, payload, error } = action;

    switch(type) {
        case 'GET_USER_START': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'GET_USER_SUCCESS': {
            return {
                ...state,
                data: payload,
                isLoading: false
            };
        }
        case 'GET_USER_ERROR': {
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

export default getUserInfo;