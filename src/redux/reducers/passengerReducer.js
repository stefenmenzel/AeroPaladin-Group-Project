const passengerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PASSENGER':
            return action.payload;
        default:
            return state;
    }
};


export default passengerReducer;
