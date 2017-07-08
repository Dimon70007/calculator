import { RESULT_ACTION_TYPES, FIELD_ACTION_TYPES } from '../constants';
import { parseArrOfStr, calcResult, newHistory, addOperWithBracket } from '../helpers';

const persistedState = localStorage.getItem('resultState');
const initObj = {
  isCalculated: true, // произошло ли вычисление операции
  operation: '',
  history: [''],
  value: '0',
  arg: '0',
  bracketsCountDiff: 0,
  // func: () => {},
};
const initState = persistedState ? JSON.parse(persistedState) : initObj;

const resultState = (state = initState, action) => {
  const { type, payload } = action;
  const [
    addNum,
    calculateResult,
    resultDeleteLast,
    clearResult,
    clearAll,
  ] = RESULT_ACTION_TYPES;
  const [addFunc, addOperation, , addLeftBracket, addRightBracket, addComma] = FIELD_ACTION_TYPES;
  const {
    isCalculated,
    // operation,
    value,
    arg,
    history,
    bracketsCountDiff,
  } = state;

  try {
    if (isCalculated) {
      switch (type) {
        case addNum:
          return {
            ...state,
            isCalculated: false,
            arg: payload,

          };
        case addComma:
          return {
            ...state,
            isCalculated: false,
            arg: `0${payload}`,
          };
        case calculateResult:
          return calcResult(state);
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
        case clearAll:
          return initObj;
        case clearResult:
          return {
            ...state,
            isCalculated: false,
            arg: '0',
          };
      // case addLeftBracket:
      //   return addLeftBracket(state)
        // {
        //   ...state,
        //   isCalculated: false,
        //   history: [...history, ['0']],
        //   arg: '0'
        //   bracketsCountDiff: bracketsCountDiff + 1,
        // };
        default:
          return state;
      }
    }
    switch (type) {
      case addNum:
        return {
          ...state,
          arg: arg === '0' ? payload : `${arg}${payload}`,
        };
      case calculateResult:
        return calcResult(state);
      case addOperation:
        return {
          ...state,
          isCalculated: true,
          value: history.length > 2 ? parseArrOfStr(newHistory(state)) : arg,
          operation: payload.val,
          history: newHistory(state),
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
      case clearAll:
        return initObj;
      case clearResult:
        return {
          ...state,
          isCalculated: false,
          arg: '0',
        };
      case addRightBracket:
        return {
          ...state,
          bracketsCountDiff: bracketsCountDiff - 1,
          history: [...history.slice(0, -1), payload],
        };
      case addComma:
        return {
          ...state,
          arg: String(arg).includes(payload) ? arg : `${arg}${payload}`,
        };
      default:
        return state;
    }
  } catch (error) {
    return {
      ...state,
      isCalculated: true,
      value: 'wrong input or operation',
    };
  }
};

export default resultState;
