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

function* crewSaga() {
    yield takeLatest('FETCH_CREW', fetchCrew);
    yield takeLatest('ADD_CREW', addCrew);
    yield takeLatest('DELETE_CREW', deleteCrew);

}

export default crewSaga;