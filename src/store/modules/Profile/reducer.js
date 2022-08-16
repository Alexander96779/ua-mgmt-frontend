const initialState = {
    isLoading: false,
    payload: [],
    error: null
};

const addNewProfile = (state = initialState, action) => {
    const { type, payload, error } = action;

    switch(type) {
        case 'ADD_PROFILE_START': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'ADD_PROFILE_SUCCESS': {
            return {
                ...state,
                payload: payload,
                isLoading: false
            };
        }
        case 'ADD_PROFILE_ERROR': {
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

export default addNewProfile;