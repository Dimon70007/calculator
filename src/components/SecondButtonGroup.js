import React from 'react';
import CreateButton from './CreateButton';

const SecondButtonGroup = ({
  btnNames = [],
 }) => {
  const buttons = btnNames.map(btnName => (
    <CreateButton
      key={btnName}
      name={btnName}
    />
  ));
  return (
    <tr>
      {buttons}
    </tr>
  );
};

export default SecondButtonGroup;
