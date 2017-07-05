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
] = BTN_TYPES;

const noop = () => {};
const funcSelector = (
  BINDED_RESULT_ACTIONS,
  BINDED_MEMORY_ACTIONS,
  BINDED_FIELD_ACTIONS,
  state,
) => {
  const [addNum, calcResult, resultDeleteLast, clearResult] = BINDED_RESULT_ACTIONS;
  const [memoryClear, memoryAdd, memorySet] = BINDED_MEMORY_ACTIONS;
  const [addFunc, addOperation, clearField] = BINDED_FIELD_ACTIONS;
  const { resultState, memoryState } = state;

  const setResultValue = (value) => {
    calcResult();
    addNum(value);
  };

  const addValue = btnName => addNum(btnName.slice(4));
  const onceActn = btnName => (!resultState.includes(btnName)) && addNum(btnName.slice(4));

  const resultValue = Number(resultState.isCalculated ? resultState.value : resultState.arg);
  const resultArg = Number(resultState.arg);
  const setResultAndAddFunc = (newValue, btnName, isCalculated) => {
    const val = btnName.slice(4);
    addFunc({ newValue, val, resultValue, isCalculated: resultState.isCalculated });
  };

  const addOp = (func, btnName, value) => {
    const val = value || btnName.slice(4);
    return addOperation({ resultState, val, func });
  };

  return ({
    [NUM]: addValue,
    [COMMA]: onceActn,
    [MEM]: (btnName) => {
      switch (btnName) {
        case 'btn_MC':
          return memoryClear();
        case 'btn_MR':
          return setResultValue(memoryState);
        case 'btn_MS':
          return memorySet(Number(resultValue));
        case 'btn_M+':
          return memoryAdd(Number(resultValue));
        case 'btn_M-':
          return memoryAdd(-Number(resultValue));
        default:
          return noop();
      }
    },
    [TRIGONOMETRIC]: (btnName) => {
      switch (btnName) {
        case ('btn_ln'):
          return setResultAndAddFunc(Math.log(resultValue), btnName, true);
        // TODO
        // case ('btn_ '):
        // case ('btn_Int'):
        // case ('btn_dms'):
        // case ('btn_F-E'):
        // case ('btn_Mod'):
        //   return noop();
        // TODO
        // case ('btn_Exp'):
        //   return setResultAndAddFunc(Math.log(resultValue), btnName, true);
        case ('btn_sinh'):
          return setResultAndAddFunc(Math.sinh(resultValue), btnName, true);
        case ('btn_sin'):
          return setResultAndAddFunc(Math.sin(resultValue), btnName, true);
        case ('btn_cosh'):
          return setResultAndAddFunc(Math.cosh(resultValue), btnName, true);
        case ('btn_cos'):
          return setResultAndAddFunc(Math.cos(resultValue), btnName, true);
        case ('btn_\\pi'):
          return setResultAndAddFunc(Math.PI, btnName, true);
        case ('btn_tanh'):
          return setResultAndAddFunc(Math.tanh(resultValue), btnName, true);
        case ('btn_tan'):
          return setResultAndAddFunc(Math.tan(resultValue), btnName, true);
        default:
          return noop();
      }
    },
    [CMN]: (btnName) => {
      const clearWithField = () => {
        clearResult();
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
    [MATH]: (btnName) => {
      switch (btnName) {
        // TODO
        // case 'btn_(':
        //   return noop();
        // case 'btn_)':
          // return noop();
        case 'btn_negate':
          return setResultAndAddFunc(-resultValue, btnName, resultState.isCalculated);
        case 'btn_√':
          return setResultAndAddFunc(Math.sqrt(resultValue), btnName, true);
        case 'btn_x^2':
          return setResultAndAddFunc(resultValue ** 2, btnName, true);
        case 'btn_n!':
          return setResultAndAddFunc(factorial(resultValue), btnName, true);
        case 'btn_x^y':
          return addOp((a, b) => a ** b, btnName, '^');
        case 'btn_sqrt[y]{x}':
          return addOp((a, b) => yroot(a, b), btnName, 'yroot');
        case 'btn_x^3':
          return setResultAndAddFunc(resultValue ** 2, btnName, true);
        case 'btn_sqrt[3]{x}':
          return setResultAndAddFunc(Math.cbrt(resultValue), 'btn_3root', true);
        case 'btn_log':
          return setResultAndAddFunc(Math.log10(resultValue), btnName, true);
        case 'btn_10^x':
          return setResultAndAddFunc(10 ** resultValue, btnName, true);
        case 'btn_1/x':
          return setResultAndAddFunc(1 / resultValue, btnName, true);
        case 'btn_%':
          console.log('resultArg ', resultArg, 'resultValue ', resultValue);
          return setResultAndAddFunc((resultArg / resultState.value) * 100, 'btn_percent', true);
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
        default:
          return noop();
      }
    },
    [CALC]: () => {
      clearField();
      return calcResult();
    },
    [NOOP]: noop,
    [TOGGLE]: () => {
       // 'btn_Inv' TODO
    },
  });
};

export default funcSelector;
