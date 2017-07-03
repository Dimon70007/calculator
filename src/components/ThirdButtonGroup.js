import React from 'react';
import CreateButton from './CreateButton';
import { itemsWrapper } from '../helpers';

const itemFunc = (btn, onClick) => {
  const wrap = (props = {}) => (<span key={btn.name} className='col'>
    <CreateButton
      key={btn.name}
      name={btn.name}
      value={btn.value}
      btnAction={onClick(btn)}
      {...props}
    />
  </span>);
  switch (btn.name) {
    case 'btn_0':
      return wrap({
        width: '10.363em',
      });
    case 'btn_=':
      return wrap({
        height: '5.363em',
      });
    default:
      return wrap();
  }
};
const groupFunc = (items, key) =>
  (<div key={key}>
    {items}
  </div>);

const ThirdButtonGroup = ({
                          btnsLeft = [],
                          btnsRight = [],
                          btnsCenter = [],
                          onClick,
 }) => {
  const btnsRightHead = btnsRight.slice(0, 4);
  const btnsRightTail = btnsRight.slice(4);
  const buttonsLeft = itemsWrapper({
    names: btnsLeft,
    itemFunc,
    groupFunc,
    groupCount: 5,
    itemArgs: [onClick],
    // groupArgs: [],
  });
  const buttonsCenter = itemsWrapper({
    names: btnsCenter,
    itemFunc,
    groupFunc,
    groupCount: 3,
    itemArgs: [onClick],
    // groupArgs: [],
  });
  const buttonsRightOne = itemsWrapper({
    names: btnsRightHead,
    itemFunc,
    groupFunc,
    groupCount: 1,
    itemArgs: [onClick],
    // groupArgs: [],
  });
  const buttonsRightTwo = itemsWrapper({
    names: btnsRightTail,
    itemFunc,
    groupFunc,
    groupCount: 1,
    itemArgs: [onClick],
    // groupArgs: [],
  });

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              {buttonsLeft}
            </td>
            <td>
              {buttonsCenter}
            </td>
            <td>
              {buttonsRightOne}
            </td>
            <td>
              {buttonsRightTwo}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ThirdButtonGroup;
