import math from 'mathjs';

const factorial = (value) => {
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

const addFunction = (arr, func) => {
  const newArr = [...arr];
  const last = newArr.pop();
  newArr.push(`${func}(${last})`);
  return newArr;
};

const setOper = (arr, oper) => {
  const newArr = [...arr];
  const last = newArr.pop();
  switch (last) {
    case '+':
    case '-':
    case '*':
    case '/':
      newArr.push(oper);
      return newArr;
    default:
      newArr.push(last);
      newArr.push(oper);
      return newArr;
  }
};

const concatLast = (arr, str) => {
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
export itemsWrapper from './itemsWrapper';
export {
  addFunction,
  factorial,
  concatLast,
  setOper,
};
