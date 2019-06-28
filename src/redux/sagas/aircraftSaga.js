import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* addAircraft(action){
    try{
        const config={
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        // console.log("action.payload", action.payload);
        yield axios.post('/api/aircraft/add', action.payload, config);
        yield put({type:'FETCH_AIRCRAFT'});
    }catch(error) {
        console.log('add aircraft request failed:', error);
    }
}

function* fetchAircraft(action) {
    try {
        const response = yield axios.get('/api/aircraft/');
        yield put({ type: 'SET_AIRCRAFT', payload: response.data });

    } catch (error) {
        console.log('Passenger GET request failed', error);
    }
}

function* deleteAircraft(action) {
    try {
        yield axios.put(`/api/aircraft/delete/${action.payload}`);
        yield put({ type: 'FETCH_AIRCRAFT' })
    } catch (error) {
        console.log('AircraftSaga DELETE request failed', error);
    }
}


function* aircraftSaga(){
    yield takeLatest('ADD_AIRCRAFT', addAircraft);
    yield takeLatest('FETCH_AIRCRAFT', fetchAircraft);
    yield takeLatest('DELETE_AIRCRAFT', deleteAircraft);


}

export default aircraftSaga;