import btnTypes from './btnTypes';

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
] = btnTypes;

export const NUM_BTNS = [
  {
    name: 'btn_7',
    value: '7',
    type: NUM,
  },
  {
    name: 'btn_8',
    value: '8',
    type: NUM,
  },
  {
    name: 'btn_9',
    value: '9',
    type: NUM,
  },
  {
    name: 'btn_4',
    value: '4',
    type: NUM,
  },
  {
    name: 'btn_5',
    value: '5',
    type: NUM,
  },
  {
    name: 'btn_6',
    value: '6',
    type: NUM,
  },
  {
    name: 'btn_1',
    value: '1',
    type: NUM,
  },
  {
    name: 'btn_2',
    value: '2',
    type: NUM,
  },
  {
    name: 'btn_3',
    value: '3',
    type: NUM,
  },
  {
    name: 'btn_0',
    value: '0',
    type: NUM,
  },
  {
    name: 'btn_,',
    value: ',',
    type: COMMA,
  },
];

export const MEM_BTNS = [
  {
    name: 'btn_MC',
    value: 'MC',
    type: MEM,
  },
  {
    name: 'btn_MR',
    value: 'MR',
    type: MEM,
  },
  {
    name: 'btn_MS',
    value: 'MS',
    type: MEM,
  },
  {
    name: 'btn_M+',
    value: 'M+',
    type: MEM,
  },
  {
    name: 'btn_M-',
    value: 'M-',
    type: MEM,
  },
];

export const CMN_BTNS = [
  {
    name: 'btn_ ',
    value: ' ',
    type: NOOP,
  },
  {
    name: 'btn_Inv',
    value: 'Inv',
    type: TOGGLE,
  },
  {
    name: 'btn_ln',
    value: 'ln',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_(',
    value: '(',
    type: CMN,
  },
  {
    name: 'btn_)',
    value: ')',
    type: CMN,
  },
  {
    name: 'btn_leftarrow',
    value: '\\leftarrow',
    type: CMN,
  },
  {
    name: 'btn_CE',
    value: 'CE',
    type: CMN,
  },
  {
    name: 'btn_C',
    value: 'C',
    type: CMN,
  },
  {
    name: 'btn_+-',
    value: '+-',
    type: MATH,
  },
  {
    name: 'btn_√',
    value: '√',
    type: MATH,
  },
];

export const FUNC_LEFT_BTNS = [
  {
    name: 'btn_Int',
    value: 'Int',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_sinh',
    value: 'sinh',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_sin',
    value: 'sin',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_x^2',
    value: 'x^2',
    type: MATH,
  },
  {
    name: 'btn_n!',
    value: 'n!',
    type: MATH,
  },
  {
    name: 'btn_dms',
    value: 'dms',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_cosh',
    value: 'cosh',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_cos',
    value: 'cos',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_x^y',
    value: 'x^y',
    type: MATH,
  },
  {
    name: 'btn_sqrt[y]{x}',
    value: '\\sqrt[y]{x}',
    type: MATH,
  },
  {
    name: 'btn_pi',
    value: '\\pi',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_tanh',
    value: 'tanh',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_tan',
    value: 'tan',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_x^3',
    value: 'x^3',
    type: MATH,
  },
  {
    name: 'btn_sqrt[3]{x}',
    value: '\\sqrt[3]{x}',
    type: MATH,
  },
  {
    name: 'btn_F-E',
    value: 'F-E',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_Exp',
    value: 'Exp',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_Mod',
    value: 'Mod',
    type: TRIGONOMETRIC,
  },
  {
    name: 'btn_log',
    value: 'log',
    type: MATH,
  },
  {
    name: 'btn_10^x',
    value: '10^x',
    type: MATH,
  },
];

export const FUNC_RIGHT_BTNS = [
  {
    name: 'btn_/',
    value: '/',
    type: OPERATION,
  },
  {
    name: 'btn_*',
    value: '*',
    type: OPERATION,
  },
  {
    name: 'btn_-',
    value: '-',
    type: OPERATION,
  },
  {
    name: 'btn_+',
    value: '+',
    type: OPERATION,
  },
  {
    name: 'btn_%',
    value: '\\%',
    type: MATH,
  },
  {
    name: 'btn_1/x',
    value: '1/x',
    type: MATH,
  },
  {
    name: 'btn_=',
    value: '=',
    type: CALC,
  },
];
