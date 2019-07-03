const crewReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CREW':
            return action.payload;
        case 'SET_UPDATE_CREW':
            return action.payload[0];
        default:
            return state;
    }
};


export default crewReducer;
