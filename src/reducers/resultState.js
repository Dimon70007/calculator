import { RESULT_ACTION_TYPES, FIELD_ACTION_TYPES } from '../constants';
import { setResultOper } from '../helpers';

const persistedState = localStorage.getItem('resultState');
const initObj = {
  isCalculated: false, // произошло ли вычисление операции
  operation: null,
  value: '',
  arg: '',
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
  const [addFunc, addOperation] = FIELD_ACTION_TYPES;
  const {
    isCalculated,
    operation,
    value,
    arg,
  } = state;
  if (isCalculated) {
    switch (type) {
      case addFunc:
      // val, resultValue
        return {
          ...state,
          isCalculated: false,
          arg: payload.newValue,
        };
      case addNum:
        return {
          operation,
          value,
          arg: payload,
        };
      case calculateResult:
        return {
          value,
        };
      case addOperation:
        return {
          ...state,
          operation: payload.func,
        };
      case resultDeleteLast:
        return state;
      case clearResult:
        return initObj;
      default:
        return state;
    }
  }
  switch (type) {
    case addFunc:
      return {
        ...state,
        isCalculated: false,
        arg: payload.newValue,
      };
    case addNum:
      return {
        ...state,
        arg: `${arg}${payload}`,
      };
    case calculateResult:
      return {
        isCalculated: true,
        value: operation ? operation(Number(value), Number(arg)) : value,
      };
    case addOperation:
    // resultValue, val, func, isCalculated
      return {
        isCalculated: true,
        value: operation ? operation(Number(value), Number(arg)) : arg,
        operation: payload.func,
      };
    case resultDeleteLast:
      return (value.length) ? {
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
