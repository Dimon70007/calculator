
const callAction = actionName => value => ({
  type: actionName,
  payload: value,
});

export default callAction;
