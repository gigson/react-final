const initialState = {
    searchResult: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        case 'SET_SEARCH_RESULT':
            return {
                searchResult: action.payload.value,
            };
    }
};

export default reducer;