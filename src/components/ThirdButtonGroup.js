import React from 'react';
import CreateButton from './CreateButton';
import { itemsWrapper } from '../helpers';
import { FirstButtonGroupCss } from '../styles';

const ThirdButtonGroup = ({ namesLeft = [], namesRight = [], namesCenter = [] }) => {
  const itemFunc = (btnName) => {
    const wrap = btn => (<span className='col'>
      {btn}
    </span>);
    switch (btnName) {
      case 'btn_0':
        return wrap(<CreateButton key={btnName} name={btnName} width='10em' />);
      case 'btn_=':
        return wrap(<CreateButton key={btnName} name={btnName} height='5em' />);
      default:
        return wrap(<CreateButton key={btnName} name={btnName} />);
    }
  };
  const groupFunc = items => (<div >
    {items}
  </div>);
  const namesRightHead = namesRight.slice(0, 4);
  const namesRightTail = namesRight.slice(4);
  const buttonsLeft = itemsWrapper(namesLeft, itemFunc, groupFunc, 5);
  const buttonsCenter = itemsWrapper(namesCenter, itemFunc, groupFunc, 3);
  const buttonsRightOne = itemsWrapper(namesRightHead, itemFunc, groupFunc, 1);
  const buttonsRightTwo = itemsWrapper(namesRightTail, itemFunc, groupFunc, 1);

  return (
    <div>
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
    </div>
  );
};

export default ThirdButtonGroup;
