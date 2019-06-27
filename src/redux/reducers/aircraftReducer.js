const aircraftReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_AIRCRAFT':
            return action.payload;
        default:
            return state;
    }
};


export default aircraftReducer;
