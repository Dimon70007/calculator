import React from 'react';
import CreateButton from './CreateButton';

const SecondButtonGroup = ({ btnNames = [] }) => {
  const buttons = btnNames.map(btnName => (
    <CreateButton key={btnName} name={btnName} />
  ));
  return (
    <div className='btn-group'>
      {buttons}
    </div>
  );
};

export default SecondButtonGroup;
