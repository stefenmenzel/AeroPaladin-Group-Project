import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPassenger(action) {
    try {
        const response = yield axios.get('/api/passenger/');
        yield put({ type: 'SET_PASSENGER', payload: response.data });

    } catch (error) {
        console.log('Passenger GET request failed', error);
    }
}

function* passengerSaga() {
    yield takeLatest('FETCH_PASSENGER', fetchPassenger);
}

export default passengerSaga;