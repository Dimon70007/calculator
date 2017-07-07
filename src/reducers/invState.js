import { INVERT } from '../constants';

const initState = false;

const resultState = (state = initState, action) => {
  if (action.type) {
    return !state;
  }
  return state;
};

export default resultState;
