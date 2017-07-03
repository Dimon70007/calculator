// import calculate from './calculateField';

// const memo = (func) => {
//   let result;
//   return (...args) => {
//     if (result) {
//       return result;
//     }
//     result = func(...args);
//     return result;
//   };
// };

// const once = (fn) => {
//   let called = false;
//   return (...args) => {
//     if (called) return;
//     called = true;
//     fn(...args);
//   };
// };
const normalizeField = (arrOfStr = [], maxFieldLength = 64) => {
  const str = arrOfStr.join(' ');
  const len = str.length - maxFieldLength;
  const idx = len > 0 ? len : 0;
  return str.slice(idx);
  // const itemsSizes = arrOfStr.map(str => String(str).length);
  // const sizeOfAll = itemsSizes.reduce((acc, size) => acc + size, 0);
  // const itemsCount = itemsSizes.length;
  // const firstEntity = memo(a => a);
  // const newFirstIdx = itemsSizes.reduce((acc, size, idx) => {
  //   const tooManyChars = maxFieldLength < (sizeOfAll - acc);
  //   const isArrayEnded = idx + 1 >= itemsCount;
  //   if (tooManyChars && isArrayEnded) {
  //     return 'Error: too many functions';
  //   }
  //   if (tooManyChars) {
  //     return acc + size;
  //   }
  //   return firstEntity(idx);
  // }, 0);
  // const first = calculate(arrOfStr.slice(0, newFirstIdx));
  // const rest = arrOfStr.slice(newFirstIdx);
  // rest.unshift(first);
  // return rest;
};

export default normalizeField;
