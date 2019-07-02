const passengerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PASSENGER':
            return action.payload;
        case 'SET_UPDATE_PASSENGER':
            return action.payload[0];
        default:
            return state;
    }
};


export default passengerReducer;
