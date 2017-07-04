import math from 'mathjs';

const operations = ['+', '-', '*', '/', '^', 'yroot'];

export itemsWrapper from './itemsWrapper';
export normalizeField from './normalizeField';

export const yroot = (value, base) => math.nthRoot(value, base);

export const factorial = (value) => {
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
        return cache[n] || saveCacheAndReturn(n, math.factorial(n));
    }
  };
  return func(value);
};

export const addFunction = (arr, { val: func, resultValue, isCalculated }) => {
  const item = `${func}(${resultValue})`;
  const last = arr[arr.length - 1];
  if (last.includes('(')) {
    return [...arr.slice(0, -1), `${func}(${last})`];
  }
  return [...arr, item];  // (!isCalculated && func === 'negate') ? arr : [...arr, item];
};

export const setOper = (arr, { arg, val: oper, isCalculated }) => {
  const last = arr[arr.length - 1];
  const rest = [arg, oper];
  if (last.includes('(')) {
    return [...arr, oper];
  }
  const multiDivide = ['*', '/'];
  if (multiDivide.includes(oper)) {
    return ['(', ...arr, arg, ')', oper];
  }
  if (operations.includes(last) && isCalculated) {
    return [...arr.slice(0, -1), oper];
  }
  return [...arr, ...rest];
};

export const setResultOper = (state, { func }) => {
  const { value, previousValue, isCalculated, operation } = state;
  if (isCalculated) {
    return {
      ...state,
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
