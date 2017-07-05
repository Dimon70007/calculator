import math from 'mathjs';

const parser = math.parser();
const secondaryOperations = ['+', '-'];
const allOperations = ['+', '-', '*', '/', '^', 'yroot'];

export function yroot(value, base) {
  return math.nthRoot(Number(value), Number(base));
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
        return cache[n] || saveCacheAndReturn(n, math.factorial(n));
    }
  };
  return func(Number(value));
}

parser.set('yroot', yroot);
parser.set('factorial', factorial);

export const parseStr = str => parser.eval(str);
export itemsWrapper from './itemsWrapper';
export normalizeField from './normalizeField';


export const addFunction = (arr, { val: func, resultValue, isCalculated }) => {
  const item = `${func}(${resultValue})`;
  const last = arr[arr.length - 1];
  if (last.includes('(')) {
    return [...arr.slice(0, -1), `${func}(${last})`];
  }
  return [...arr, item];  // (!isCalculated && func === 'negate') ? arr : [...arr, item];
};
export const strIncludes = (str = '', arr = []) => arr.reduce((acc, targetStr) => (acc || str.includes(targetStr)), false);

export const setOper = (arr, { arg, val: oper, isCalculated }) => {
  const lastIdx = arr.length - 1;
  const last = arr[lastIdx];
  const rest = [arg, oper];
  if (last.includes('(')) {
    return [...arr, oper];
  }
  // если ставится знак после подсчета результата
  // и он примари (!=secondaryOperations)
  // - обрамить в скобки без последнего знака
  // if (isCalculated
  //   && allOperations.includes(last)
  //   && !secondaryOperations.includes(oper)) {
  //   return ['(', ...arr.slice(0, -1), ')', oper];
  // } TODO
  if (isCalculated && allOperations.includes(last)) {
    return [...arr.slice(0, -1), oper];
  }
  return [...arr, ...rest];
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
