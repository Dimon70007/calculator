import { MEMORY_ACTION_TYPES } from '../constants';

const persistedState = localStorage.getItem('memoryState');
const initState = persistedState ? JSON.parse(persistedState) : 0;

const resultState = (state = initState, action) => {
  const { type, payload } = action;
  const [memoryClear, memoryAdd, memorySet] = MEMORY_ACTION_TYPES;
  switch (type) {
    case memoryAdd:
      return state + payload;
    case memorySet:
      return payload;
    case memoryClear:
      return 0;
    default:
      return state;
  }
};

export default resultState;
