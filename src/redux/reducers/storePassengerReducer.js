const storePassengerReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_PASSENGER':
            return action.payload;
        default:
            return state;
    }
};


export default storePassengerReducer;