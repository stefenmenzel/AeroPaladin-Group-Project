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
        // yield put({type:'FETCH_AIRCRAFT'});
    }catch(error) {
        console.log('add aircraft request failed:', error);
    }
}

function* aircraftSaga(){
    yield takeLatest('ADD_AIRCRAFT', addAircraft);
}

export default aircraftSaga;