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

function* deletePassenger(action) {
    try {
        yield axios.put(`/api/passenger/delete/${action.payload}`, action.payload, config);
        yield put({ type: 'FETCH_PASSENGER' });
    } catch (error) {
        console.log('Delete passenger request failed:', error);
    }
}

function* updatePassenger(action) {
    try{
        yield axios.put('/api/passenger/update', action.payload, config);
        // yield put({type: 'FETCH_PASSENGER'});
    }catch(error) {
        console.log('error in update passenger request:', error);
    }
}

function* fetchUpdatePassenger(action) {
    try {
        const response = yield axios.get(`/api/passenger/updatepassenger/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_PASSENGER', payload: response.data });

    } catch (error) {
        console.log('Passenger Update Form GET request failed', error);
    }
}

function* fetchUpdatePassengerDocumentOne(action) {
    try {
        console.log("action.payload for document 1:", action.payload);
        const response = yield axios.get(`/api/passenger/updatedocument1/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_DOCUMENT_ONE', payload: response.data });

    } catch (error) {
        console.log('Passenger Update Form GET Document One request failed', error);
    }
}

function* fetchUpdatePassengerDocumentTwo(action) {
    try {
        console.log("action.payload for document 2:", action.payload);
        const response = yield axios.get(`/api/passenger/updatedocument2/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_DOCUMENT_TWO', payload: response.data });

    } catch (error) {
        console.log('Passenger Update Form GET Document Two request failed', error);
    }
}

function* passengerSaga() {
    yield takeLatest('FETCH_PASSENGER', fetchPassenger);
    yield takeLatest('ADD_PASSENGER', addPassenger);
    yield takeLatest('DELETE_PASSENGER', deletePassenger);
    yield takeLatest('FETCH_UPDATE_PASSENGER', fetchUpdatePassenger);
    yield takeLatest('FETCH_UPDATE_PASSENGER_DOCUMENT_ONE', fetchUpdatePassengerDocumentOne);
    yield takeLatest('FETCH_UPDATE_PASSENGER_DOCUMENT_TWO', fetchUpdatePassengerDocumentTwo);
    yield takeLatest('UPDATE_PASSENGER', updatePassenger);
}

export default passengerSaga;