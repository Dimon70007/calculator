import math from 'mathjs';

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

export const addFunction = (arr, func) => {
  const newArr = [...arr];
  const last = newArr.pop();
  newArr.push(`${func}(${last})`);
  return newArr;
};

export const setOper = (arr, { resultValue, val: oper, isCalculated }) => {
  // const newArr = [...arr];
  const last = arr[arr.length - 1];
  // let value;
  // let operation;
  // switch (last) {
  //   case '+':
  //   case '-':
  // }
  const operations = ['+', '-', '*', '/', '^', 'yroot'];
  const rest = isCalculated ? [oper] : [resultValue, oper];
  if (operations.includes(last) && isCalculated) {
    return [...arr.slice(0, -1), ...rest];
  }
  return [...arr, ...rest];
};

export const setResultOper = (state, { val, func }) => {
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
    operationMark: val,
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
