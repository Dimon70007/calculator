import { BTN_TYPES } from '../constants';
import { factorial } from '../helpers';

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
  const [addToResult, calcResult, resultDeleteLast, clearResult] = BINDED_RESULT_ACTIONS;
  const [memoryClear, memoryAdd, memorySet] = BINDED_MEMORY_ACTIONS;
  const [addFunc, addOperation, fieldChangeLast, calculateField, clearField] = BINDED_FIELD_ACTIONS;
  const { fieldState, resultState, memoryState } = state;
  const setResultValue = (value) => {
    clearResult();
    addToResult(value);
  };
  const addValue = btnName => addToResult(btnName.slice(4));
  const onceActn = btnName => (!resultState.includes(btnName)) && addToResult(btnName.slice(4));
  return ({
    [NUM]: addValue,
    [COMMA]: onceActn,
    [MEM]: (btnName) => {
      switch (btnName) {
        case 'btn_MC':
          return memoryClear();
        case 'btn_MR':
          clearResult();
          return addToResult(memoryState);
        case 'btn_MS':
          return memorySet(Number(resultState.value));
        case 'btn_M+':
          return memoryAdd(Number(resultState.value));
        case 'btn_M-':
          return memoryAdd(-Number(resultState.value));
        default:
          return noop();
      }
    },
    [TRIGONOMETRIC]: (btnName) => {
      const val = btnName.slice(4);
      const calcResultAndAddFunc = (calculated) => {
        addFunc(val);
        return setResultValue(calculated);
      };
      const resultValue = Number(resultState.value);
      switch (btnName) {
        case ('btn_ln'):
          return calcResultAndAddFunc(Math.log(resultValue));
        // TODO
        // case ('btn_ '):
        // case ('btn_Int'):
        // case ('btn_dms'):
        // case ('btn_F-E'):
        // case ('btn_Mod'):
        //   return noop();
        case ('btn_sinh'):
          return calcResultAndAddFunc(Math.sinh(resultValue));
        case ('btn_sin'):
          return calcResultAndAddFunc(Math.sin(resultValue));
        case ('btn_cosh'):
          return calcResultAndAddFunc(Math.cosh(resultValue));
        case ('btn_cos'):
          return calcResultAndAddFunc(Math.cos(resultValue));
        case ('btn_\\pi'):
          return calcResultAndAddFunc(Math.PI);
        case ('btn_tanh'):
          return calcResultAndAddFunc(Math.tanh(resultValue));
        case ('btn_tan'):
          return calcResultAndAddFunc(Math.tan(resultValue));
        // TODO
        // case ('btn_Exp'):
        //   return calcResultAndAddFunc(Math.log(resultValue));
        default:
          return noop();
      }
    },
    [CMN]: (btnName) => {
      const val = btnName.slice(4);
      const calcResultAndAddFunc = (calculated) => {
        addFunc(val);
        return setResultValue(calculated);
      };
      const clearWithField = () => {
        clearResult();
        return clearField();
      };
      const resultValue = Number(resultState.value);
      switch (btnName) {
        case 'btn_leftarrow':
          return resultDeleteLast();
        case 'btn_CE':
          return clearWithField();
        case 'btn_C':
          return clearResult();
        case 'btn_negate':
          return calcResultAndAddFunc(-resultValue);
        case 'btn_√':
          return calcResultAndAddFunc(Math.sqrt(resultValue));
        default:
          return noop();
      }
    },
    [MATH]: (btnName) => {
      const val = btnName.slice(4);
      const calcResultAndAddFunc = (calculated) => {
        addFunc(val);
        return setResultValue(calculated);
      };
      const resultValue = Number(resultState.value);
      switch (btnName) {
        // TODO
        // case 'btn_(':
        //   return noop();
        // case 'btn_)':
          // return noop();
        case 'btn_x^2':
          return calcResultAndAddFunc(resultValue ** 2);
        case 'btn_n!':
          return calcResultAndAddFunc(factorial(resultValue));
        case 'btn_x^y':
          return addOperation(resultValue, '^');
        case 'btn_sqrt[y]{x}':
          return addOperation(resultValue, 'yroot');
        case 'btn_x^3':
          return calcResultAndAddFunc(resultValue ** 2);
        case 'btn_sqrt[3]{x}':
          return calcResultAndAddFunc(Math.cbrt(resultValue));
        case 'btn_log':
          return calcResultAndAddFunc(Math.log10(resultValue));
        case 'btn_10^x':
          return calcResultAndAddFunc(10 ** resultValue);
        default:
          return noop();
      }
    },
    [OPERATION]: (btnName) => {
      const val = btnName.slice(4);
      const resultValue = Number(resultState.value);
      const calcResultAndAddFunc = (calculated) => {
        addFunc(val);
        return setResultValue(calculated);
      };
      const addOp = () => addOperation(val);
      switch (btnName) {
        case 'btn_/':
        case 'btn_*':
        case 'btn_-':
        case 'btn_+':
          return addOp();
        // case 'btn_%': not realised in windows
        //   return noop();
        case 'btn_1/x':
          return calcResultAndAddFunc(1 / resultValue);
        default:
          return noop();
      }
    },
    [CALC]: () => calculateField(fieldState),
    [NOOP]: noop,
    [TOGGLE]: () => {
       // 'btn_Inv' TODO
    },
  });
};

export default funcSelector;
