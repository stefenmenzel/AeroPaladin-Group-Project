import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const config={
    headers: {'Content-type': 'application/json'},
    withCredentials: true
};


function* fetchCrew(action) {
    try {
        const response = yield axios.get('/api/crew/', config);
        yield put({ type: 'SET_CREW', payload: response.data });

    } catch (error) {
        console.log('Passenger GET request failed', error);
    }
}

function* addCrew(action){
    try{
        console.log('addcrew saga post', action.payload)
        yield axios.post('/api/crew/add', action.payload, config);
        yield put({type:'FETCH_CREW'});
    }catch(error){
        console.log('add crew request failed:', error);
    }
}

function* deleteCrew(action) {
    try {
        yield axios.put(`/api/crew/delete/${action.payload}`);
        yield put({ type: 'FETCH_CREW' });
    } catch (error) {
        console.log('Delete crew request failed:', error);
    }
}

function* updateCrew(action){
    try{
        yield axios.put('/api/crew/update', action.payload, config);
        yield put({type: 'FETCH_CREW'});
    }catch(error){
        console.log('error in update Crew request:');
    }
}

function* fetchUpdateCrew(action) {
    try {
        const response = yield axios.get(`/api/crew/updatecrew/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_CREW', payload: response.data });

    } catch (error) {
        console.log('Crew Update Form GET request failed', error);
    }
}

function* fetchUpdateCrewEmergencyContact(action) {
    try {
        const response = yield axios.get(`/api/crew/updateemergency/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_CREW_EMERGENCY_CONTACT', payload: response.data });

    } catch (error) {
        console.log('Crew Update Form GET request failed', error);
    }
}

function* fetchUpdateCrewDocumentOne(action) {
    try {
        const response = yield axios.get(`/api/crew/updatedocument1/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_DOCUMENT_ONE', payload: response.data });

    } catch (error) {
        console.log('Crew Update Form GET Document One request failed', error);
    }
}

function* fetchUpdateCrewDocumentTwo(action) {
    try {
        const response = yield axios.get(`/api/crew/updatedocument2/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_DOCUMENT_TWO', payload: response.data });

    } catch (error) {
        console.log('Crew Update Form GET Document Two request failed', error);
    }
}

function* crewSaga() {
    yield takeLatest('FETCH_CREW', fetchCrew);
    yield takeLatest('ADD_CREW', addCrew);
    yield takeLatest('DELETE_CREW', deleteCrew);
    yield takeLatest('UPDATE_CREW', updateCrew);
    yield takeLatest('FETCH_UPDATE_CREW', fetchUpdateCrew);
    yield takeLatest('FETCH_UPDATE_CREW_EMERGENCY_CONTACT', fetchUpdateCrewEmergencyContact);
    yield takeLatest('FETCH_UPDATE_CREW_DOCUMENT_ONE', fetchUpdateCrewDocumentOne);
    yield takeLatest('FETCH_UPDATE_CREW_DOCUMENT_TWO', fetchUpdateCrewDocumentTwo);
}

export default crewSaga;