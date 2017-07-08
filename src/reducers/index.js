import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import fieldState from './fieldState';
import resultState from './resultState';
import memoryState from './memoryState';
import invState from './invState';

const reducer = combineReducers({
  routing: routerReducer, // => state.routing
  fieldState,
  resultState, // func apply to resultValue
  memoryState,
  invState,
});

export default reducer;
