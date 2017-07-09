import math from 'mathjs';
// import * as Decimal from 'decimal.js';

export const bigmath = math.create({
  number: 'BigNumber', // Default type of number:
                       // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 32,       // Number of significant digits for BigNumbers
});

const parser = bigmath.parser();
parser.set('yroot', yroot);
parser.set('factorial', factorial);

const secondaryOperations = ['+', '-'];
const allOperations = ['+', '-', '*', '/', '^', 'yroot', '%'];
const constants = ['pi'];

export function yroot(value, base) {
  return math.nthRoot(math.bignumber(value), math.bignumber(base));
}

export function factorial(value) {
  const cache = {};
  const saveCacheAndReturn = (idx, val) => {
    cache[idx] = val;
    return val;
  };
  const func = (n) => {
    switch (n) {
      case 0:
      case 1:
        return 1;
      default:
        // return math.factorial(n);
        return cache[n] || saveCacheAndReturn(n, math.factorial(n));
    }
  };
  return func(math.bignumber(value));
}

export const parseArrOfStr = (arrOfStr) => {
  const concated = arrOfStr.reduce((acc, item) => (Array.isArray(item) ?
    [...acc, parseArrOfStr(item)] : [...acc, item]), []);
  const parsed = parser.eval(concated.join(' '));
  return parsed.toString ? parsed.toString() : parsed;
};


export const addFunction = (arr, { val: func, resultValue }) => {
  const newFunc = param => (constants.includes(func) ? func : `${func}(${param})`);
  const item = newFunc(resultValue);
  const last = arr[arr.length - 1];
  if (last.includes(')')) {
    return [...arr.slice(0, -1), `${func}(${last})`];
  }
  return [...arr, item];  // (!isCalculated && func === 'negate') ? arr : [...arr, item];
};

export const strIncludes = (str = '', arr = []) => arr.reduce((acc, targetStr) => (acc || str.includes(targetStr)), false);

export const setOper = (arr, { value, arg, val: oper, isCalculated }) => {
  const lastIdx = arr.length - 1;
  const last = arr[lastIdx];
  if (last.includes(')')) {
    return [...arr, oper];
  }

  if (isCalculated) {
    if (allOperations.includes(last)) {
      return [...arr.slice(0, -1), oper];
    }
    return [...arr, value, oper];
  }

  return [...arr, arg, oper];
};

export const addOperWithBracket = (state) => {
  const {
    // isCalculated,
    operation,
    value,
    arg,
    history,
    bracketsCountDiff,
  } = state;
  const last = history.lenght ? history[history.lenght - 1] : value;
  const innerHistory = Array.isArray(last) ? last : [last];
  if (bracketsCountDiff > 1) {
    const newState = {
      ...state,
      bracketsCountDiff: bracketsCountDiff - 1,
      history: innerHistory,
    };
    return [...history.slice(0, -1), addOperWithBracket(newState)];
  }
  return Array.isArray(last) ?
    [...history.slice(0, -1), [...last, operation, value]] :
    [...history, operation, [arg]];
};

export const newHistory = ({ operation, value, arg, history }) => {
  if (operation === 'yroot') {
    const previousArg = history.length > 1 ? history[history.length - 1] : value;
    return [...history.slice(0, -1), `yroot(${previousArg}, ${arg})`];
  }
  return [...history, operation, arg];
};


export const calcResult = (state) => {
  const { arg, history } = state;
  const newHist = history.length > 2 ? newHistory(state) : [arg];
  const idx = newHist.reduce((acc, item, index) =>
    (secondaryOperations.includes(item) ? index : acc), 0);
  if (idx > 0) {
    const mark = newHist[idx];
    const rest = history.length > (idx + 1) ? newHist.slice(idx + 1) : [arg];
    return {
      ...state,
      isCalculated: true,
      value: history.length > 2 ? parseArrOfStr(newHist) : arg,
      history: newHist,
      arg: parseArrOfStr(rest),
      operation: mark,
    };
  }
  return {
    ...state,
    isCalculated: true,
    value: history.length > 2 ? parseArrOfStr(newHist) : arg,
    history: newHist,
  };
};

export itemsWrapper from './itemsWrapper';
export normalizeField from './normalizeField';
