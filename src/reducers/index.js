import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { PREFIX_OF_ACTION } from '../constants';

const reducer = combineReducers({
  routing: routerReducer, // => state.routing
  // PREFIX_OF_ACTION: myImportedReducer,
});

export default reducer;
