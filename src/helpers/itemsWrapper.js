const noop = () => {};

const itemsWrapper = ({
  names = [],
  itemFunc = noop,
  groupFunc = noop,
  groupCount = 3,
  itemArgs = [],
  groupArgs = [] }) => {
  const result = [];
  names.reduce((acc, btnName, idx) => {
    const item = itemFunc(btnName, ...itemArgs);
    const items = acc.length ? [...acc, item] : [item];
    const haveGroup = ((idx + 1) % groupCount) === 0;
    const isLastItem = (names.length - 1) === idx;
    if (haveGroup || isLastItem) {
      const group = groupFunc(items, result.length, ...groupArgs);
      result.push(group);
      return [];
    }
    return items;
  }, []);
  return result;
};

export default itemsWrapper;
