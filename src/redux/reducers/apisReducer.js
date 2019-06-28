import {combineReducers} from 'redux'

 const crew = (state = {}, action) => {
     switch (action.type) {
         case 'SET_APIS_CREW':
             return action.payload;             
     
         default:
             return state;
     }
 }

const apisReducer = combineReducers({
    crew,
})

export default apisReducer;