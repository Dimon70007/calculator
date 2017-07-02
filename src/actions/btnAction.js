
const btnAction = btn => () => ({
  type: btn.type,
  name: btn.name,
});

export default btnAction;
