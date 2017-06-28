import React from 'react';
import CreateButton from './CreateButton';
import { itemsWrapper } from '../helpers';

const ThirdButtonGroup = ({ namesLeft = [], namesRight = [], namesCenter = [] }) => {
  const itemFunc = btnName => (<CreateButton key={btnName} name={btnName} />);
  const groupFunc = items => (<div className='row' >
    {items}
  </div>);
  const buttonsLeft = namesLeft.map(btnName => (
    <CreateButton key={btnName} name={btnName} />
  ));
  const buttonsCenter = itemsWrapper(namesCenter, itemFunc, groupFunc, 3);
  const buttonsRight = namesRight.map(btnName => (
    <CreateButton key={btnName} name={btnName} />
  ));

  return (
    <div className='row'>
      <div className='col-sm-4'>
        {buttonsLeft}
      </div>
      <div className='col-sm-4'>
        {buttonsCenter}
      </div>
      <div className='col-sm-4'>
        {buttonsRight}
      </div>
    </div>
  );
};

export default ThirdButtonGroup;
