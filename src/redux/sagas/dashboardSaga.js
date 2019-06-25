import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* fetchApisTrips() {
    try {
        const response = yield axios.get('api/dashboard/apis');
        yield put({ type: 'SET_APIS_TRIPS', payload:response.data});
    } catch(error) {
        console.log('GET APIS Trips failed', error)
    }
}

function* dashboardSaga(){
    yield takeLatest('FETCH_APIS_TRIPS', fetchApisTrips);
}


export default dashboardSaga;