import { FIELD_ACTION_TYPES } from '../constants';
import { addFunction, setOper } from '../helpers';

const persistedState = localStorage.getItem('fieldState');
const init = [''];
const initState = persistedState ? JSON.parse(persistedState) : init;

const fieldState = (state = initState, action) => {
  const { type, payload } = action;
  const [addFunc, addOperation, clearField] = FIELD_ACTION_TYPES;
  switch (type) {
    case addOperation:
      return setOper(state, payload);
    case addFunc:
      return addFunction(state, payload.val);
    case clearField:
      return init;
    default:
      return state;
  }
};

export default fieldState;
