import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCrew(action) {
    try {
        const response = yield axios.get('/api/crew/');
        yield put({ type: 'SET_CREW', payload: response.data });

    } catch (error) {
        console.log('Passenger GET request failed', error);
    }
}

function* crewSaga() {
    yield takeLatest('FETCH_CREW', fetchCrew);
}

export default crewSaga;