import {combineReducers} from 'redux'


 const crew = (state = {}, action) => {
     switch (action.type) {
         case 'SET_APIS_CREW':
         return action.payload;             
         default:
             return state;
     }
 }

 const aircraft = (state = {}, action) => {
     switch (action.type) {
         case 'SET_APIS_AIRCRAFT':
             return action.payload;             
         default:
             return state;
     }
 }

const apisReducer = combineReducers({
    crew,
    aircraft,

})

export default apisReducer;