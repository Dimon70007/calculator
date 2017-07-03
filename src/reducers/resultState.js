import { RESULT_ACTION_TYPES, FIELD_ACTION_TYPES } from '../constants';
import { setResultOper } from '../helpers';

const persistedState = localStorage.getItem('resultState');
const initObj = {
  isCalculated: false,
  operation: null,
  operationMark: '',
  value: '',
  previousValue: '',
};
const initState = persistedState ? JSON.parse(persistedState) : initObj;

const resultState = (state = initState, action) => {
  const { type, payload } = action;
  const [
    addNum,
    calculateResult,
    resultDeleteLast,
    clearResult,
  ] = RESULT_ACTION_TYPES;
  const [, addOperation] = FIELD_ACTION_TYPES;
  const {
    isCalculated,
    operation,
    operationMark,
    value,
    previousValue,
  } = state;
  switch (type) {
    case addNum:
      return {
        operation,
        previousValue: isCalculated ? value : previousValue,
        value: isCalculated ? payload : `${value}${payload}`,
      };
    case calculateResult:
      return {
        isCalculated: true,
        value: operation && operation(Number(previousValue), Number(value)),
      };
    case addOperation:
      return setResultOper(state, payload);
      // (payload.val === operationMark) ?
      //   state : {
      //     value: operation ? operation(Number(previousValue), Number(value)) : value,
      //     previousValue: value,
      //     isCalculated: true,
      //     operation: payload.func,
      //     operationMark: payload.val,
      //   };
    case resultDeleteLast:
      return (!isCalculated && value.length) ? {
        ...state,
        value: value.slice(0, -1),
      } : state;
    case clearResult:
      return initObj;
    default:
      return state;
  }
};

export default resultState;
