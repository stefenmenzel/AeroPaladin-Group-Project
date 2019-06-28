import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const config={
    headers: {'Content-type': 'application/json'},
    withCredentials: true
};

function* fetchPassenger(action) {
    try {
        const response = yield axios.get('/api/passenger/', config);
        console.log('passenger GET saga', response.data)
        yield put({ type: 'SET_PASSENGER', payload: response.data });

    } catch (error) {
        console.log('Passenger GET request failed', error);
    }
}

function* addPassenger(action){
    try{
        yield axios.post('/api/passenger/add', action.payload, config);
        yield put({type:'FETCH_PASSENGER'});
    }catch(error){
        console.log('add passenger request failed:', error);
    }
}

function* passengerSaga() {
    yield takeLatest('FETCH_PASSENGER', fetchPassenger);
    yield takeLatest('ADD_PASSENGER', addPassenger);
}

export default passengerSaga;