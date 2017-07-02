import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import fieldState from './fieldStateReducer';
import resultState from './resultState';
import memoryState from './memoryState';

const reducer = combineReducers({
  routing: routerReducer, // => state.routing
  fieldState,
  resultState, // func apply to resultValue
  memoryState,
});

export default reducer;
