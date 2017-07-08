import { BTN_TYPES } from '../constants';

const initState = false;

const resultState = (state = initState, action) => {
  const [,,,,,,,,, TOGGLE, INVERTED] = BTN_TYPES;
  if (action.type === TOGGLE) {
    return !state;
  }
  if (action.type === INVERTED) {
    return false;
  }
  return state;
};

export default resultState;
