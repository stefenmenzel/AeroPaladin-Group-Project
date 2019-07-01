import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

//get all the APIS Trips from the server api/dashboard/apis
function* fetchApisTrips() {
    try {
        const response = yield axios.get('api/dashboard/apis');
        yield put({ type: 'SET_APIS_TRIPS', payload:response.data});
    } catch(error) {
        console.log('GET APIS Trips failed', error)
    }
}
//delete Apis Trip 
function* deleteApisTrips(action) {
    try {
        console.log('delete from sagas', action.payload)
        yield axios.put(`api/dashboard/delete/${action.payload.id}`)
        yield put({type:'FETCH_APIS_TRIPS'})
    } catch(error) {
        console.log('DELETE Apis Trip failed', error)
    }
}
//update APIS trip
// function* updateApisTrips(action) {
//     try {
//         console.log('update from sagas', action.payload)
//     }
// }

function* dashboardSaga(){
    yield takeLatest('FETCH_APIS_TRIPS', fetchApisTrips);
    //yield takeLatest('DELETE_APIS_TRIPS', deleteApisTrips);
    //yield takeLatest('UPDATE_APIS_TRIPS', updateApisTrips)
    
}


export default dashboardSaga;