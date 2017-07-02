import { ACTIONS } from '../constants';
import { addFunction, concatLast, setOper } from '../helpers';

const persistedState = localStorage.getItem('resultState');
const initState = persistedState ? JSON.parse(persistedState) : {
  isCalculated: false,
  value: '',
};

const resultState = (state = initState, action) => {
  const { type, payload } = action;
  const [addNum, addFunc, changeLast, deleteLast, clear, clearWithMemory, addOperation] = ACTIONS;
  switch (type) {
    case addNum:
      return `${state}${payload}`;
    case addFunc:
      return addFunction(state, payload);
    case changeLast:
      return state.length ? [
        ...(state.slice(0, -1)),
        payload,
      ] : [];
    case deleteLast:
      return state.length ? [
        ...(state.slice(0, -1)),
      ] : [];
    case clear:
      return [];
    case clearWithMemory:
      localStorage.setItem('fieldState', '');
      return [];
    default:
      return state;
  }
};

export default resultState;
