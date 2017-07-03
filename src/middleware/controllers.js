import { BTN_TYPES, RESULT_ACTION_TYPES, MEMORY_ACTION_TYPES, FIELD_ACTION_TYPES } from '../constants';
import { funcSelector } from '../controllers';

const middleware = store => next => (action) => {
  const { type, name } = action;
  if (!BTN_TYPES.includes(type)) {
    return next(action);
  }
  const bindAction = actionType => payload =>
    store.dispatch({ type: actionType, payload });
  const BINDED_RESULT_ACTIONS = RESULT_ACTION_TYPES.map(bindAction);
  const BINDED_MEMORY_ACTIONS = MEMORY_ACTION_TYPES.map(bindAction);
  const BINDED_FIELD_ACTIONS = FIELD_ACTION_TYPES.map(bindAction);

  const dispatch = funcSelector(
    BINDED_RESULT_ACTIONS,
    BINDED_MEMORY_ACTIONS,
    BINDED_FIELD_ACTIONS,
    store.getState(),
  );
  dispatch[type](name);
  return next(action);
};
// dispatch снаружи - M1 -> next -> M2 --> .....
export default middleware;
