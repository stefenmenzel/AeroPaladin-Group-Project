import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

function* addAircraft(action){
    try{
        
        // console.log("action.payload", action.payload);
        yield axios.post('/api/aircraft/add', action.payload, config);
        yield put({type:'FETCH_AIRCRAFT'});
    }catch(error) {
        console.log('add aircraft request failed:', error);
    }
}

function* fetchAircraft(action) {
    try {
        const response = yield axios.get('/api/aircraft/', config);
        yield put({ type: 'SET_AIRCRAFT', payload: response.data });

    } catch (error) {
        console.log('Aircraft GET request failed', error);
    }
}

function* fetchUpdateAircraft(action) {
    try {
        const response = yield axios.get(`/api/aircraft/updateaircraft/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_AIRCRAFT', payload: response.data });

    } catch (error) {
        console.log('Aircraft Update Form GET request failed', error);
    }
}

function* fetchUpdateOperator(action) {
    try {
        const response = yield axios.get(`/api/aircraft/updateoperator/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_OPERATOR', payload: response.data });

    } catch (error) {
        console.log('Operator Update Form GET request failed', error);
    }
}

function* fetchUpdateOwner(action) {
    try {
        const response = yield axios.get(`/api/aircraft/updateowner/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_OWNER', payload: response.data });

    } catch (error) {
        console.log('Owner Update Form GET request failed', error);
    }
}


function* deleteAircraft(action) {
    try {
        yield axios.put(`/api/aircraft/delete/${action.payload}`, null, config);
        yield put({ type: 'FETCH_AIRCRAFT' })
    } catch (error) {
        console.log('AircraftSaga DELETE request failed', error);
    }
}

function* updateAircraft(action) {
    try{
        yield axios.put('/api/aircraft/update', action.payload, config);
        yield put({type: 'FETCH_AIRCRAFT'});
    }catch (error){
        console.log("error in update Aircraft request:", error);
    }
}


function* aircraftSaga(){
    yield takeLatest('ADD_AIRCRAFT', addAircraft);
    yield takeLatest('FETCH_AIRCRAFT', fetchAircraft);
    yield takeLatest('DELETE_AIRCRAFT', deleteAircraft);
    yield takeLatest('FETCH_UPDATE_AIRCRAFT', fetchUpdateAircraft);
    yield takeLatest('FETCH_UPDATE_OPERATOR', fetchUpdateOperator);
    yield takeLatest('FETCH_UPDATE_OWNER', fetchUpdateOwner);
    yield takeLatest('UPDATE_AIRCRAFT', updateAircraft);
}

export default aircraftSaga;