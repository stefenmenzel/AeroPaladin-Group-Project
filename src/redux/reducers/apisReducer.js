import {combineReducers} from 'redux'

 const aircraft = (state = {}, action) => {
     switch (action.type) {
         case 'SET_APIS_AIRCRAFT':
             return action.payload;             
     
         default:
             return state;
     }
 }

const apisReducer = combineReducers({
    aircraft,
})

export default apisReducer;