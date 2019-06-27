const apisReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_APIS':
            return [
                ...state,
                action.payload
            ];    
        default:
            return state;
    }
}

export default apisReducer;