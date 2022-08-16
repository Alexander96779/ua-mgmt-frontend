const initialState = {
    isLoading: false,
    payload: [],
    error: null
};

const addNewDocument = (state = initialState, action) => {
    const { type, payload, error } = action;

    switch(type) {
        case 'ADD_DOCUMENT_START': {
            return {
                ...state,
                isLoading: true
            };
        }
        case 'ADD_DOCUMENT_SUCCESS': {
            return {
                ...state,
                payload: payload,
                isLoading: false
            };
        }
        case 'ADD_DOCUMENT_ERROR': {
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

export default addNewDocument;