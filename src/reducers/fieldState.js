import { FIELD_ACTION_TYPES } from '../constants';
import { addFunction, setOper } from '../helpers';

const persistedState = localStorage.getItem('fieldState');
const init = [''];
const initState = persistedState ? JSON.parse(persistedState) : init;

const fieldState = (state = initState, action) => {
  const { type, payload } = action;
  if (!FIELD_ACTION_TYPES.includes(type)) {
    return state;
  }
  const [addFunc,
    addOperation,
    clearField,
    addLeftBracket,
    addRightBracket] = FIELD_ACTION_TYPES;
  const { resultState, val } = payload || {};
  switch (type) {
    case addOperation:
      return setOper(state, { ...resultState, val });
    case addFunc:
      return addFunction(state, payload);
    case clearField:
      return init;
    case addLeftBracket:
      return resultState.isCalculated ? [
        ...state,
        val,
      ] : state;
    case addRightBracket:
      return resultState.isCalculated ? state : [
        ...state,
        resultState.arg,
        val,
      ];
    default:
      return state;
  }
};

export default fieldState;
