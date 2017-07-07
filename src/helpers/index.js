import math from 'mathjs';
// import * as Decimal from 'decimal.js';

export const bigmath = math.create({
  number: 'BigNumber', // Default type of number:
                       // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 64,       // Number of significant digits for BigNumbers
});

const parser = bigmath.parser();
parser.set('yroot', yroot);
parser.set('factorial', factorial);

const secondaryOperations = ['+', '-'];
const allOperations = ['+', '-', '*', '/', '^', 'yroot'];

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

export const joinArrOfStr = arr => arr.reduce((acc, item) => (Array.isArray(item) ? `${acc} ( ${joinArrOfStr(item)} )` : `${acc} ${item}`));

export const parseArrOfStr = (arrOfStr) => {
  const str = joinArrOfStr(arrOfStr);
  const parsed = parser.eval(str);
  // let bracketCountDiff = 0;
  // const firstBracketIdx = arrOfStr.reduce((acc, bracket, idx) => {
  //   switch (bracket) {
  //     case '(':
  //       bracketCountDiff += 1;
  //       return bracketCountDiff > 0 ? acc : idx;
  //     case ')':
  //       bracketCountDiff -= 1;
  //       return acc;
  //     default:
  //       return acc;
  //   }
  // }, 0);
  return parsed.toString ? parsed.toString() : parsed;
};
export itemsWrapper from './itemsWrapper';
export normalizeField from './normalizeField';


export const addFunction = (arr, { val: func, resultValue, isCalculated }) => {
  const item = `${func}(${resultValue})`;
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
  if (last.includes('(')) {
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

export const setResultOper = (state, { func, val }) => {
  const { value, previousValue, isCalculated, operation } = state;
  if (isCalculated) {
    return {
      ...state,
      operation: func,
    };
  }
  if (secondaryOperations.includes(val)) {
    return {
      value: operation ? operation(Number(previousValue), Number(value)) : value,
      previousValue: value,
      isCalculated: true,
      operation: func,
    };
  }
  return {
    value: operation ? operation(Number(previousValue), Number(value)) : value,
    previousValue: value,
    isCalculated: true,
    operation: func,
  };
};

export const concatLast = (arr, str) => {
  const newArr = [...arr];
  const last = newArr.pop();
  const next = `${last}${str}`;
  if (Number(next) === Number.POSITIVE_INFINITY ||
    Number(next) === Number.NEGATIVE_INFINITY ||
    Number(next) === Number.NaN) {
    return arr;
  }
  newArr.push(next);
  return newArr;
};
