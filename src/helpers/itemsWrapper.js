const noop = () => {};

const itemsWrapper = (names = [], itemFunc = noop, groupFunc = noop, groupCount = 3) => {
  const result = [];
  names.reduce((acc, btnName, idx) => {
    const item = itemFunc(btnName);
    const items = acc.length ? [...acc, item] : [item];
    const haveGroup = ((idx + 1) % groupCount) === 0;
    const isLastItem = (names.length - 1) === idx;
    if (haveGroup || isLastItem) {
      const group = groupFunc(items);
      result.push(group);
      return [];
    }
    return items;
  }, []);
  return result;
};

export default itemsWrapper;
