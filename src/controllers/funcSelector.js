import math from 'mathjs';
import { BTN_TYPES } from '../constants';
import { factorial, yroot } from '../helpers';

const [
  NUM,
  COMMA,
  MEM,
  TRIGONOMETRIC,
  CMN,
  OPERATION,
  MATH,
  CALC,
  NOOP,
  TOGGLE,
  INVERTED,
] = BTN_TYPES;

const noop = () => {};
const funcSelector = (
  BINDED_RESULT_ACTIONS,
  BINDED_MEMORY_ACTIONS,
  BINDED_FIELD_ACTIONS,
  state,
) => {
  const [
    addNum,
    calcResult,
    resultDeleteLast,
    clearResult,
    clearAll] = BINDED_RESULT_ACTIONS;
  const [
    addFunc,
    addOperation,
    clearField,
    addLeftBracket,
    addRightBracket,
    addComma] = BINDED_FIELD_ACTIONS;
  const [memoryClear, memoryAdd, memorySet] = BINDED_MEMORY_ACTIONS;
  const { resultState, memoryState } = state;

  const addValue = btnName => addNum(btnName.slice(4));
  const toBig = (value) => {
    try {
      return math.bignumber(value);
    } catch (error) {
      // console.log('wrong value: ', value, error);
      return Number(value);
    }
  };
  const resultValue = toBig(resultState.isCalculated ?
    resultState.value : resultState.arg);
  const resultArg = toBig(resultState.arg || '0');
  const setResultAndAddFunc = (newValue, btnName) => {
    const val = btnName.slice(4);
    const newVal = newValue.toString ? newValue.toString() : newValue;
    addFunc({ newValue: newVal, val, resultValue, isCalculated: resultState.isCalculated });
  };

  const addOp = (func, btnName, value) => {
    const val = value || btnName.slice(4);
    return addOperation({ resultState, val, func });
  };

  return ({
    [NUM]: addValue,
    [COMMA]: () => addComma('.'),
    [MEM]: (btnName) => {
      switch (btnName) {
        case 'btn_MC':
          return memoryClear();
        case 'btn_MR':
          clearResult();
          return addNum(memoryState);
        case 'btn_MS':
          return memorySet(toBig(resultValue));
        case 'btn_M+':
          return memoryAdd(toBig(resultValue));
        case 'btn_M-':
          return memoryAdd(-toBig(resultValue));
        default:
          return noop();
      }
    },
    [CMN]: (btnName) => {
      const clearWithField = () => {
        clearAll();
        clearField();
      };
      switch (btnName) {
        case 'btn_leftarrow':
          return resultDeleteLast();
        case 'btn_CE':
          return clearResult();
        case 'btn_C':
          return clearWithField();
        default:
          return noop();
      }
    },
    [TRIGONOMETRIC]: (btnName) => {
      switch (btnName) {
        // TODO
        // case ('btn_ '):
        // case ('btn_Int'):
        // case ('btn_dms'):
        case ('btn_pi'):
          return setResultAndAddFunc(math.PI, btnName, true);
        // case ('btn_F-E'):
        // TODO
        case ('btn_sinh'):
          return setResultAndAddFunc(math.sinh(resultValue), btnName, true);
        case ('btn_cosh'):
          return setResultAndAddFunc(math.cosh(resultValue), btnName, true);
        case ('btn_tanh'):
          return setResultAndAddFunc(math.tanh(resultValue), btnName, true);
          // case ('btn_Exp'):
          //   return setResultAndAddFunc(math.log(resultValue), btnName, true);
        case ('btn_ln'):
          return setResultAndAddFunc(math.log(resultValue), btnName, true);
        case ('btn_sin'):
          return setResultAndAddFunc(math.sin(resultValue), btnName, true);
        case ('btn_cos'):
          return setResultAndAddFunc(math.cos(resultValue), btnName, true);
        case ('btn_tan'):
          return setResultAndAddFunc(math.tan(resultValue), btnName, true);

        default:
          return noop();
      }
    },
    [MATH]: (btnName) => {
      switch (btnName) {
        // case 'btn_(':
        //   return addLeftBracket({ resultState, val: '(' });
        // case 'btn_)':
        //   return addRightBracket({ resultState, val: ')' });
        case 'btn_negate':
          return setResultAndAddFunc(-resultValue, btnName, resultState.isCalculated);
        case 'btn_√':
          return setResultAndAddFunc(math.sqrt(resultValue), btnName, true);
        case 'btn_x^2':
          return setResultAndAddFunc(resultValue ** 2, btnName, true);
        case 'btn_n!':
          return setResultAndAddFunc(factorial(resultValue), btnName, true);
        case 'btn_x^3':
          return setResultAndAddFunc(resultValue ** 3, btnName, true);
        case 'btn_sqrt[3]{x}':
          return setResultAndAddFunc(math.cbrt(resultValue), 'btn_3root', true);
        case 'btn_log':
          return setResultAndAddFunc(math.log10(resultValue), btnName, true);
        case 'btn_10^x':
          return setResultAndAddFunc(10 ** resultValue, btnName, true);
        case 'btn_1/x':
          return setResultAndAddFunc(1 / resultValue, btnName, true);
        case 'btn_%':
          return setResultAndAddFunc((resultArg * resultState.value) / 100, 'btn_percent', true);
        default:
          return noop();
      }
    },
    [OPERATION]: (btnName) => {
      switch (btnName) {
        case 'btn_/':
          return addOp((a, b) => a / b, btnName);
        case 'btn_*':
          return addOp((a, b) => a * b, btnName);
        case 'btn_-':
          return addOp((a, b) => a - b, btnName);
        case 'btn_+':
          return addOp((a, b) => a + b, btnName);
        case 'btn_x^y':
          return addOp((a, b) => a ** b, btnName, '^');
        case 'btn_sqrt[y]{x}':
          return addOp((a, b) => yroot(a, b), btnName, 'yroot');
        case ('btn_Mod'):
          return addOp((a, b) => a % b, btnName, '%');
        default:
          return noop();
      }
    },
    [CALC]: () => {
      clearField();
      return calcResult();
    },
    [NOOP]: noop,
    [TOGGLE]: noop,
    [INVERTED]: (btnName) => {
      switch (btnName) {
        case ('btn_e^x'):
          return setResultAndAddFunc(math.E ** resultValue, btnName, true);
        // TODO
        // case ('btn_ '):
        // case ('btn_Frac'):
        // case ('btn_deg'):
        //   return noop();
        // TODO
        case ('btn_asinh'):
          return setResultAndAddFunc(math.asinh(resultValue), btnName, true);
        case ('btn_asin'):
          return setResultAndAddFunc(math.asin(resultValue), btnName, true);
        case ('btn_acosh'):
          return setResultAndAddFunc(math.acosh(resultValue), btnName, true);
        case ('btn_acos'):
          return setResultAndAddFunc(math.acos(resultValue), btnName, true);
        case ('btn_2*pi'):
          return setResultAndAddFunc(2 * math.PI, btnName, true);
        case ('btn_atanh'):
          return setResultAndAddFunc(math.atanh(resultValue), btnName, true);
        case ('btn_atan'):
          return setResultAndAddFunc(math.atan(resultValue), btnName, true);
        default:
          return noop();
      }
    },
  });
};

export default funcSelector;
