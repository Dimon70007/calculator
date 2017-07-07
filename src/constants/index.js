export const PATHNAME_PREFIX = '/'; // process.env.PUBLIC_URL;

export const PROMISE = 'PROMISE';
export const INVERT = 'INVERT';
export const RESULT_ACTION_TYPES = [
  'ADD_NUM',
  'CALCULATE_RESULT', // func(result)
  'RESULT_DELETE_LAST',
  'CLEAR_RESULT',
  'CLEAR_ALL',
];

export const MEMORY_ACTION_TYPES = [
  'MEMORY_CLEAR',
  'MEMORY_ADD',
  'MEMORY_SET',
];

export const FIELD_ACTION_TYPES = [
  'ADD_FUNC', //  FIELD_CHANGE_LAST and CALCULATE_RESULT
  'ADD_OPERATION',
  'CLEAR_FIELD',
  'ADD_LEFT_BRACKET',
  'ADD_RIGHT_BRACKET',
];

export BTN_TYPES from './btnTypes';
export {
  NUM_BTNS,
  MEM_BTNS,
  CMN_BTNS,
  FUNC_LEFT_BTNS,
  FUNC_RIGHT_BTNS,
} from './buttons';
