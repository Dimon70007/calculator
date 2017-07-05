import { RESULT_ACTION_TYPES, FIELD_ACTION_TYPES } from '../constants';
import { parseStr, factorial, yroot } from '../helpers';

const persistedState = localStorage.getItem('resultState');
const initObj = {
  isCalculated: false, // произошло ли вычисление операции
  operation: '',
  str: '',
  value: '',
  arg: '',
  func: () => {},
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
    str,
    func,
  } = state;
  const newStr = (oldStr) => {
    if (operation === 'yroot') {
      return `yroot(${value}, ${arg})`;
    }
    return `${oldStr} ${operation} ${arg}`;
  };
  if (isCalculated) {
    switch (type) {
      case addNum:
        return {
          ...state,
          isCalculated: false,
          arg: payload,
        };
      case calculateResult:
        return {
          ...state,
          isCalculated: true,
          // strIncludes(str, allOperations) ? parseStr(newStr(str)) : value || arg,
          value: str ? parseStr(newStr(str)) : arg,
          str: str ? parseStr(newStr(str)) : arg,
        };
      case addOperation:
        return {
          ...state,
          operation: payload.val,
          func: payload.func,
        };
      case addFunc:
      // val, resultValue
        return {
          ...state,
          isCalculated: false,
          arg: payload.newValue,
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
    case addNum:
      return {
        ...state,
        arg: `${arg}${payload}`,
      };
    case calculateResult:
      return {
        ...state,
        isCalculated: true,
        // strIncludes(str, allOperations) ? parseStr(newStr(str)) : value || arg,
        value: str ? parseStr(newStr(str)) : arg,
        str: str ? parseStr(newStr(str)) : arg,
      };
    case addOperation:
      return {
        isCalculated: true,
        value: str ? parseStr(newStr(str)) : arg,
        operation: payload.val,
        str: newStr(str),
        func: payload.func,
      };
    case addFunc:
      return {
        ...state,
        isCalculated: false,
        arg: payload.newValue,
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
